import * as React from "react";
import type { ZxcvbnFactory } from "@zxcvbn-ts/core";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, Check, Edit, Eye, EyeOff, Globe } from "lucide-react";
import {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";

import { PixelCanvas } from "@/components/blocks/pixel-canvas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { PhoneInput } from "@/components/ui/phone-input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { value: "en", label: "English", languageLabel: "Language" },
  { value: "ta", label: "தமிழ்", languageLabel: "மொழி" },
  { value: "ml", label: "മലയാളം", languageLabel: "ഭാഷ" },
  { value: "mr", label: "मराठी", languageLabel: "भाषा" },
  { value: "kn", label: "ಕನ್ನಡ", languageLabel: "ಭಾಷೆ" },
  { value: "hi", label: "हिन्दी", languageLabel: "भाषा" },
] as const;

const PREVIEW_RESET_OTP = "123456";

function PhonePasswordResetForm({
  phoneNumber,
  onChangePhone,
}: {
  phoneNumber: string;
  onChangePhone: () => void;
}) {
  const [step, setStep] = React.useState<"otp" | "password">("otp");
  const [otp, setOtp] = React.useState("");
  const [passwords, setPasswords] = React.useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [visible, setVisible] = React.useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = React.useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = React.useState("");
  const [resendAt, setResendAt] = React.useState(() => Date.now() + 15000);
  const [remaining, setRemaining] = React.useState(15);
  const otpRef = React.useRef<HTMLInputElement>(null);
  const [strengthEstimator, setStrengthEstimator] =
    React.useState<ZxcvbnFactory | null>(null);
  const [strengthUnavailable, setStrengthUnavailable] = React.useState(false);
  const passwordMeetsRequirements = passwords.newPassword.length >= 8;
  const passwordsMatch =
    passwords.confirmPassword.length > 0 &&
    passwords.confirmPassword === passwords.newPassword;
  const canSetPassword = passwordMeetsRequirements && passwordsMatch;
  const strength =
    strengthEstimator && passwords.newPassword
      ? strengthEstimator.check(passwords.newPassword)
      : null;
  const strengthLabel = !passwords.newPassword
    ? "Not entered"
    : strengthUnavailable
      ? "Unavailable"
      : strength
        ? ["Very weak", "Weak", "Fair", "Strong", "Very strong"][strength.score]
        : "Checking";

  React.useEffect(() => {
    if (step !== "password") return;
    let cancelled = false;
    Promise.all([
      import("@zxcvbn-ts/core"),
      import("@zxcvbn-ts/language-common"),
      import("@zxcvbn-ts/language-en"),
    ])
      .then(([core, common, english]) => {
        if (cancelled) return;
        setStrengthEstimator(
          new core.ZxcvbnFactory({
            dictionary: { ...common.dictionary, ...english.dictionary },
            graphs: common.adjacencyGraphs,
            translations: english.translations,
          })
        );
      })
      .catch(() => {
        if (!cancelled) setStrengthUnavailable(true);
      });
    return () => {
      cancelled = true;
    };
  }, [step]);

  React.useEffect(() => {
    if (step !== "otp") return;
    const timer = window.setInterval(() => {
      const seconds = Math.max(0, Math.ceil((resendAt - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) window.clearInterval(timer);
    }, 250);
    return () => window.clearInterval(timer);
  }, [resendAt, step]);

  return (
    <FieldGroup>
      <Field orientation="horizontal">
        <Button type="button" variant="tertiary" onClick={onChangePhone}>
          <ArrowLeft data-icon="inline-start" aria-hidden="true" />
          Change phone number
        </Button>
      </Field>
      <Field>
        <h1 id="password-reset-title" className="text-xl font-semibold">
          {step === "otp" ? "Verify your phone number" : "Reset password"}
        </h1>
        <FieldDescription id="password-reset-description">
          {step === "otp"
            ? `Enter the 6-digit OTP for ${formatPhoneNumberIntl(phoneNumber)} to continue.`
            : "Create and confirm your new password."}
        </FieldDescription>
        <FieldDescription id="reset-password-requirements">
          {step === "otp"
            ? `Preview verification code: ${PREVIEW_RESET_OTP}.`
            : "Use at least 8 characters."}
        </FieldDescription>
      </Field>
      <form
        noValidate
        aria-labelledby="password-reset-title"
        aria-describedby="password-reset-description"
        onSubmit={(event) => {
          event.preventDefault();
          setStatus("");
          if (step === "otp") {
            const otpError =
              otp.length !== 6
                ? "Enter all 6 digits."
                : otp !== PREVIEW_RESET_OTP
                  ? "Incorrect code. Check the code and try again."
                  : "";
            setErrors((current) => ({ ...current, otp: otpError }));
            if (otpError) {
              otpRef.current?.focus();
              return;
            }
            setOtp("");
            setStep("password");
            return;
          }
          const nextErrors = {
            otp: "",
            newPassword: passwordMeetsRequirements
              ? ""
              : "Use at least 8 characters.",
            confirmPassword: !passwords.confirmPassword
              ? "Confirm your new password."
              : !passwordsMatch
                ? "Passwords must match."
                : "",
          };
          setErrors(nextErrors);
          if (nextErrors.newPassword || nextErrors.confirmPassword) {
            event.currentTarget
              .querySelector<HTMLInputElement>(
                nextErrors.newPassword
                  ? "#reset-newPassword"
                  : "#reset-confirmPassword"
              )
              ?.focus();
          } else {
            setStatus(
              "Password updates are unavailable in this preview. Your password was not changed."
            );
            setPasswords({ newPassword: "", confirmPassword: "" });
            setVisible({ newPassword: false, confirmPassword: false });
          }
        }}
      >
        <FieldGroup>
          {step === "otp" ? (
            <Field data-invalid={!!errors.otp}>
              <FieldLabel htmlFor="reset-otp">6-digit OTP</FieldLabel>
              <InputOTP
                ref={otpRef}
                id="reset-otp"
                name="otp"
                maxLength={6}
                pushPasswordManagerStrategy="none"
                pattern={REGEXP_ONLY_DIGITS}
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  setErrors((current) => ({ ...current, otp: "" }));
                  setStatus("");
                }}
                aria-invalid={!!errors.otp}
                aria-describedby={errors.otp ? "reset-otp-error" : undefined}
                containerClassName="w-full"
                className="w-full"
                required
              >
                <InputOTPGroup className="w-full justify-between">
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="h-12 min-w-0 flex-1 font-mono text-lg"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              {errors.otp && (
                <FieldError id="reset-otp-error">{errors.otp}</FieldError>
              )}
            </Field>
          ) : (
            <>
              {(["newPassword", "confirmPassword"] as const).map((name) => {
                const label =
                  name === "newPassword"
                    ? "New password"
                    : "Confirm new password";
                return (
                  <Field key={name} data-invalid={!!errors[name]}>
                    <FieldLabel htmlFor={`reset-${name}`}>{label}</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id={`reset-${name}`}
                        name={name}
                        type={visible[name] ? "text" : "password"}
                        autoComplete="new-password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        autoFocus={name === "newPassword"}
                        placeholder={label}
                        value={passwords[name]}
                        onChange={(event) => {
                          setPasswords((current) => ({
                            ...current,
                            [name]: event.target.value,
                          }));
                          setErrors((current) => ({
                            ...current,
                            [name]: "",
                            confirmPassword: "",
                          }));
                          setStatus("");
                        }}
                        aria-invalid={!!errors[name]}
                        aria-describedby={[
                          name === "newPassword"
                            ? "reset-password-requirements reset-password-strength"
                            : "reset-password-match",
                          errors[name] ? `reset-${name}-error` : undefined,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        required
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          type="button"
                          size="icon-xs"
                          aria-label={`${visible[name] ? "Hide" : "Show"} ${label.toLowerCase()}`}
                          aria-pressed={visible[name]}
                          onClick={() =>
                            setVisible((current) => ({
                              ...current,
                              [name]: !current[name],
                            }))
                          }
                        >
                          {visible[name] ? (
                            <EyeOff aria-hidden="true" />
                          ) : (
                            <Eye aria-hidden="true" />
                          )}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    {name === "newPassword" && (
                      <>
                        <Progress
                          role="meter"
                          value={strength?.score ?? 0}
                          max={4}
                          aria-label="Password strength"
                          aria-valuetext={strengthLabel}
                          aria-busy={
                            !!passwords.newPassword &&
                            !strengthEstimator &&
                            !strengthUnavailable
                          }
                        />
                        <FieldDescription
                          id="reset-password-strength"
                          role="status"
                          aria-live="polite"
                          aria-atomic="true"
                        >
                          Password strength: {strengthLabel}
                        </FieldDescription>
                      </>
                    )}
                    {name === "confirmPassword" && (
                      <FieldDescription
                        id="reset-password-match"
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        className="flex items-center gap-1.5"
                      >
                        {passwordsMatch && (
                          <Check
                            aria-hidden="true"
                            className="size-4 shrink-0"
                          />
                        )}
                        {passwordsMatch
                          ? "Passwords match."
                          : passwords.confirmPassword
                            ? "Passwords do not match yet."
                            : "Re-enter your new password."}
                      </FieldDescription>
                    )}
                    {errors[name] && (
                      <FieldError id={`reset-${name}-error`}>
                        {errors[name]}
                      </FieldError>
                    )}
                  </Field>
                );
              })}
            </>
          )}
          <Field>
            <Button
              type="submit"
              disabled={step === "otp" ? otp.length !== 6 : !canSetPassword}
            >
              {step === "otp" ? "Verify OTP" : "Set password"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      {step === "otp" && (
        <Alert variant="warning" role="note">
          <AlertDescription>
            Don't share this verification code with anyone.
          </AlertDescription>
        </Alert>
      )}
      <Field>
        {step === "otp" && (
          <Button
            type="button"
            variant="ghost"
            disabled={remaining > 0}
            onClick={() => {
              setResendAt(Date.now() + 15000);
              setRemaining(15);
              setOtp("");
              setErrors((current) => ({ ...current, otp: "" }));
              setStatus(
                "SMS delivery is unavailable in this preview. No OTP was sent."
              );
            }}
          >
            {remaining > 0
              ? `Resend OTP in ${remaining} seconds`
              : "Resend OTP"}
          </Button>
        )}
      </Field>
      <FieldDescription role="status" aria-live="polite">
        {status}
      </FieldDescription>
    </FieldGroup>
  );
}

function PasswordResetForm({
  username,
  onUsernameChange,
  onBack,
}: {
  username: string;
  onUsernameChange: (value: string) => void;
  onBack: () => void;
}) {
  const [method, setMethod] = React.useState<"email" | "phone">("email");
  const [enterOtp, setEnterOtp] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState<string>();
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");

  function changeMethod(nextMethod: "email" | "phone") {
    setMethod(nextMethod);
    setError("");
    setStatus("");
  }

  if (enterOtp && phoneNumber) {
    return (
      <PhonePasswordResetForm
        phoneNumber={phoneNumber}
        onChangePhone={() => {
          setEnterOtp(false);
          setError("");
          setStatus("");
        }}
      />
    );
  }

  return (
    <FieldGroup>
      <Field orientation="horizontal">
        <Button
          type="button"
          variant="tertiary"
          onClick={() =>
            method === "phone" ? changeMethod("email") : onBack()
          }
        >
          <ArrowLeft data-icon="inline-start" aria-hidden="true" />
          {method === "phone" ? "Back to email reset" : "Back to login"}
        </Button>
      </Field>
      <Field>
        <h1 id="password-reset-title" className="text-xl font-semibold">
          {method === "email" ? "Forgot password?" : "Reset using phone number"}
        </h1>
        <FieldDescription id="password-reset-description">
          {method === "email"
            ? "Enter your username, and if it exists, we will send you a link to reset your password."
            : "Enter your registered phone number, and if it exists, we will send you an OTP to reset your password."}
        </FieldDescription>
      </Field>
      <form
        aria-labelledby="password-reset-title"
        aria-describedby="password-reset-description"
        onSubmit={(event) => {
          event.preventDefault();
          setStatus("");
          if (
            method === "email"
              ? !username.trim()
              : !phoneNumber || !isValidPhoneNumber(phoneNumber)
          ) {
            setError(
              method === "email"
                ? "Enter your username."
                : "Enter a valid phone number."
            );
            event.currentTarget
              .querySelector<HTMLInputElement>("input")
              ?.focus();
            return;
          }
          setError("");
          if (method === "phone") {
            setEnterOtp(true);
          } else {
            setStatus(
              "Email delivery is unavailable in this preview. No reset link was sent."
            );
          }
        }}
      >
        <FieldGroup>
          <Field data-invalid={!!error}>
            <FieldLabel
              htmlFor={method === "email" ? "reset-username" : "reset-phone"}
            >
              {method === "email" ? "Username" : "Phone number"}
            </FieldLabel>
            {method === "email" ? (
              <Input
                key="email"
                id="reset-username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(event) => {
                  onUsernameChange(event.target.value);
                  setError("");
                  setStatus("");
                }}
                placeholder="Enter username"
                aria-invalid={!!error}
                aria-describedby={error ? "password-reset-error" : undefined}
                required
              />
            ) : (
              <PhoneInput
                key="phone"
                id="reset-phone"
                name="phone"
                defaultCountry="IN"
                autoFocus
                value={phoneNumber}
                onChange={(value) => {
                  setPhoneNumber(value);
                  setError("");
                  setStatus("");
                }}
                placeholder="Phone number"
                aria-invalid={!!error}
                aria-describedby={error ? "password-reset-error" : undefined}
                required
              />
            )}
            {error && (
              <FieldError id="password-reset-error">{error}</FieldError>
            )}
          </Field>
          <Field>
            <Button type="submit" disabled={method === "phone" && !phoneNumber}>
              {method === "email" ? "Send reset link" : "Send OTP"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      {method === "email" && (
        <Field>
          <FieldDescription className="text-center">
            Can't access your email?
          </FieldDescription>
          <Button
            type="button"
            variant="link"
            onClick={() => changeMethod("phone")}
          >
            Reset using phone number
          </Button>
        </Field>
      )}
      <FieldDescription role="status" aria-live="polite">
        {status}
      </FieldDescription>
    </FieldGroup>
  );
}

export function StaffSignInDemo({ fullPage = false }: { fullPage?: boolean }) {
  const [formMode, setFormMode] = React.useState<"staff" | "patient">("staff");
  const [resetPassword, setResetPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [patientStep, setPatientStep] = React.useState<"phone" | "otp">(
    "phone"
  );
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("password");
  const [phoneNumber, setPhoneNumber] = React.useState<string>();
  const [otp, setOtp] = React.useState("");
  const [otpError, setOtpError] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [language, setLanguage] = React.useState("en");
  const selectedLanguage =
    LANGUAGES.find((option) => option.value === language) ?? LANGUAGES[0];

  function changeFormMode(mode: "staff" | "patient") {
    setFormMode(mode);
    setResetPassword(false);
    setPatientStep("phone");
    setOtp("");
    setOtpError("");
    setStatus("");
  }

  return (
    <div
      className={cn(
        "bg-primary flex flex-col overflow-hidden px-0.5 pt-0.5",
        fullPage ? "h-dvh" : "min-h-180"
      )}
    >
      <main className="border-primary bg-background relative isolate flex min-h-0 flex-1 flex-col items-center gap-4 overflow-x-hidden overflow-y-auto rounded-t-md rounded-b-2xl border-2 p-2 md:px-4 md:pt-8 md:pb-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--color-primary)_1px,transparent_1px)] bg-size-[16px_16px] opacity-10"
        />
        <PixelCanvas variant="care" className="absolute inset-0 z-0" />
        <div className="relative z-10 flex w-full max-w-xl flex-1 flex-col items-center justify-start gap-2">
          <Tabs
            value={formMode}
            onValueChange={(value) => {
              if (value === "staff" || value === "patient") {
                changeFormMode(value);
              }
            }}
            className="w-full max-w-sm gap-4"
          >
            <img
              src="/brand-assets/uploads/Care-Logos/SVG/Care-logotype-on-light.svg"
              alt="Care"
              width={2000}
              height={520}
              className="h-auto w-28 self-center dark:hidden"
            />
            <img
              src="/brand-assets/uploads/Care-Logos/SVG/Care-logotype-color-icon-on-dark.svg"
              alt=""
              aria-hidden="true"
              width={2000}
              height={520}
              className="hidden h-auto w-28 self-center dark:block"
            />
            <TabsList
              aria-label="Sign-in method"
              className="w-full group-data-horizontal/tabs:h-12 md:mt-4 md:group-data-horizontal/tabs:h-12"
            >
              <TabsTrigger value="staff" className="min-h-11 text-base">
                Staff sign-in
              </TabsTrigger>
              <TabsTrigger value="patient" className="min-h-11 text-base">
                Patient sign-in
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value={formMode}
              className="md:bg-soft-background w-full flex-none md:rounded-4xl md:border md:p-2"
            >
              <section
                aria-labelledby={
                  resetPassword
                    ? "password-reset-title"
                    : `${formMode}-sign-in-title`
                }
                className="border-border bg-card ring-foreground/5 relative isolate w-full max-w-sm overflow-clip rounded-2xl border shadow-lg ring-1"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 144 96"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute top-0 right-0 z-0 h-24 w-36 mask-[radial-gradient(ellipse_at_top_right,black_15%,transparent_45%)] opacity-50"
                >
                  <g fill="#a7f3d0" opacity="0.2">
                    <rect x="12" y="0" width="11" height="11" rx="1.25" />
                    <rect x="72" y="0" width="11" height="11" rx="1.25" />
                    <rect x="120" y="12" width="11" height="11" rx="1.25" />
                    <rect x="36" y="24" width="11" height="11" rx="1.25" />
                    <rect x="84" y="24" width="11" height="11" rx="1.25" />
                    <rect x="0" y="36" width="11" height="11" rx="1.25" />
                    <rect x="60" y="36" width="11" height="11" rx="1.25" />
                    <rect x="108" y="48" width="11" height="11" rx="1.25" />
                    <rect x="24" y="60" width="11" height="11" rx="1.25" />
                    <rect x="84" y="60" width="11" height="11" rx="1.25" />
                    <rect x="132" y="72" width="11" height="11" rx="1.25" />
                    <rect x="48" y="84" width="11" height="11" rx="1.25" />
                  </g>
                  <g fill="#10b981" opacity="0.1">
                    <rect x="108" y="0" width="11" height="11" rx="1.25" />
                    <rect x="24" y="12" width="11" height="11" rx="1.25" />
                    <rect x="132" y="24" width="11" height="11" rx="1.25" />
                    <rect x="96" y="36" width="11" height="11" rx="1.25" />
                    <rect x="48" y="48" width="11" height="11" rx="1.25" />
                    <rect x="120" y="60" width="11" height="11" rx="1.25" />
                  </g>
                  <g fill="#065f46" opacity="0.15">
                    <rect x="132" y="0" width="11" height="11" rx="1.25" />
                    <rect x="72" y="24" width="11" height="11" rx="1.25" />
                    <rect x="108" y="72" width="11" height="11" rx="1.25" />
                  </g>
                </svg>
                <div className="relative z-10 p-4 pt-6 md:p-6 md:pb-4">
                  {resetPassword ? (
                    <PasswordResetForm
                      username={username}
                      onUsernameChange={setUsername}
                      onBack={() => setResetPassword(false)}
                    />
                  ) : (
                    <>
                      <header className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <h1
                            id={`${formMode}-sign-in-title`}
                            className="text-xl font-semibold"
                          >
                            {formMode === "staff"
                              ? "Staff sign-in"
                              : patientStep === "phone"
                                ? "Patient sign-in"
                                : "Enter the code"}
                          </h1>
                          <p className="text-muted-foreground text-sm leading-4">
                            {formMode === "staff"
                              ? "Use the username and password from your facility."
                              : patientStep === "phone"
                                ? "Sign in with your mobile number."
                                : "We sent a 6-digit code by SMS."}
                          </p>
                        </div>
                        <img
                          src={
                            formMode === "staff"
                              ? "/stethescope-icon-glass.svg"
                              : "/patient-icon-glass.svg"
                          }
                          alt=""
                          aria-hidden="true"
                          width={40}
                          height={40}
                          className="mt-1 size-10 shrink-0"
                        />
                      </header>

                      <form
                        className="mt-4 grid gap-6"
                        onSubmit={(event) => {
                          event.preventDefault();
                          if (formMode === "staff") {
                            return;
                          }

                          if (patientStep === "phone") {
                            setOtp("");
                            setOtpError("");
                            setPatientStep("otp");
                            return;
                          }

                          if (otp.length !== 6) {
                            setOtpError("Enter all 6 digits.");
                            return;
                          }

                          setOtpError("");
                        }}
                      >
                        {formMode === "staff" ? (
                          <>
                            <Field>
                              <FieldLabel htmlFor="staff-username">
                                Username
                              </FieldLabel>
                              <Input
                                id="staff-username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(event) =>
                                  setUsername(event.target.value)
                                }
                                autoFocus={fullPage}
                                placeholder="Enter username"
                                required
                              />
                            </Field>

                            <Field>
                              <FieldLabel htmlFor="staff-password">
                                Password
                              </FieldLabel>
                              <InputGroup>
                                <InputGroupInput
                                  id="staff-password"
                                  name="password"
                                  type={showPassword ? "text" : "password"}
                                  autoComplete="current-password"
                                  value={password}
                                  onChange={(event) =>
                                    setPassword(event.target.value)
                                  }
                                  required
                                />
                                <InputGroupAddon align="inline-end">
                                  <InputGroupButton
                                    size="icon-xs"
                                    aria-label={
                                      showPassword
                                        ? "Hide password"
                                        : "Show password"
                                    }
                                    aria-pressed={showPassword}
                                    onClick={() =>
                                      setShowPassword((visible) => !visible)
                                    }
                                  >
                                    {showPassword ? (
                                      <EyeOff aria-hidden="true" />
                                    ) : (
                                      <Eye aria-hidden="true" />
                                    )}
                                  </InputGroupButton>
                                </InputGroupAddon>
                              </InputGroup>
                            </Field>
                            <div className="flex flex-col gap-4">
                              <Button type="submit">Sign In</Button>
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                  setStatus("");
                                  setResetPassword(true);
                                }}
                              >
                                Forgot password?
                              </Button>
                            </div>
                          </>
                        ) : patientStep === "phone" ? (
                          <>
                            <Field>
                              <FieldLabel htmlFor="patient-phone">
                                Phone number
                              </FieldLabel>
                              <PhoneInput
                                id="patient-phone"
                                name="phone"
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                                defaultCountry="IN"
                                autoFocus={fullPage}
                                placeholder="Phone number"
                                required
                              />
                            </Field>
                            <Button type="submit">Send code</Button>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p
                                className="text-soft-foreground text-xl font-semibold"
                                dir="ltr"
                              >
                                {phoneNumber
                                  ? formatPhoneNumberIntl(phoneNumber)
                                  : ""}
                              </p>
                              <Button
                                type="button"
                                variant="tertiary"
                                size="default"
                                aria-label="Edit mobile number"
                                onClick={() => {
                                  setPatientStep("phone");
                                  setOtp("");
                                  setOtpError("");
                                  setStatus("");
                                }}
                              >
                                <Edit
                                  data-icon="inline-start"
                                  aria-hidden="true"
                                />
                                Edit
                              </Button>
                            </div>
                            <Field data-invalid={!!otpError}>
                              <FieldLabel htmlFor="patient-otp">
                                6-digit code
                              </FieldLabel>
                              <InputOTP
                                id="patient-otp"
                                name="otp"
                                maxLength={6}
                                pushPasswordManagerStrategy="none"
                                pattern={REGEXP_ONLY_DIGITS}
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                autoFocus
                                value={otp}
                                onChange={(value) => {
                                  setOtp(value.replace(/\D/g, "").slice(0, 6));
                                  setOtpError("");
                                }}
                                onComplete={() => {
                                  setOtpError("");
                                }}
                                aria-label="6-digit code"
                                aria-invalid={!!otpError}
                                aria-describedby={
                                  otpError ? "patient-otp-error" : undefined
                                }
                                containerClassName="w-full"
                                className="w-full"
                              >
                                <InputOTPGroup className="w-full justify-between">
                                  {Array.from({ length: 6 }, (_, index) => (
                                    <InputOTPSlot
                                      key={index}
                                      index={index}
                                      className="h-12 min-w-0 flex-1 font-mono text-lg"
                                    />
                                  ))}
                                </InputOTPGroup>
                              </InputOTP>
                              {otpError && (
                                <p
                                  id="patient-otp-error"
                                  role="alert"
                                  className="text-destructive text-sm"
                                >
                                  {otpError}
                                </p>
                              )}
                            </Field>
                            <Button type="submit">Verify &amp; sign in</Button>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() =>
                                setStatus("OTP resend is preview only.")
                              }
                            >
                              Resend OTP
                            </Button>
                          </>
                        )}
                      </form>

                      <p
                        className={
                          status
                            ? "text-muted-foreground mt-3 text-xs"
                            : "sr-only"
                        }
                        role="status"
                        aria-live="polite"
                      >
                        {status}
                      </p>
                    </>
                  )}
                </div>
              </section>
            </TabsContent>
          </Tabs>
          <section
            aria-labelledby="sign-in-language-label"
            className="relative z-10 flex w-full flex-wrap items-center justify-center gap-3 rounded-xl p-2 md:rounded-t-4xl md:rounded-b-xl"
          >
            <div className="flex shrink-0 items-center gap-3">
              <h2
                id="sign-in-language-label"
                lang={selectedLanguage.value}
                className="text-muted-foreground flex items-center gap-1.5 text-sm font-normal"
              >
                <Globe
                  aria-hidden="true"
                  className="size-4 shrink-0"
                  strokeWidth={1.5}
                />
                {selectedLanguage.languageLabel}
              </h2>
            </div>
            <Separator
              orientation="vertical"
              aria-hidden="true"
              className="h-6 shrink-0 data-vertical:self-center"
            />
            <div className="flex-1 md:hidden">
              <Select
                value={language}
                onValueChange={(value) => {
                  if (typeof value === "string") setLanguage(value);
                }}
              >
                <SelectTrigger
                  aria-labelledby="sign-in-language-label"
                  className="w-full"
                >
                  <SelectValue lang={selectedLanguage.value}>
                    {selectedLanguage.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    {LANGUAGES.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        lang={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <ToggleGroup
              aria-labelledby="sign-in-language-label"
              value={[language]}
              onValueChange={(values) => {
                const selected = values[0];
                if (typeof selected === "string") setLanguage(selected);
              }}
              spacing={1}
              size="default"
              className="hidden max-w-full flex-wrap justify-center md:flex"
            >
              {LANGUAGES.map((option) => (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  lang={option.value}
                  className="aria-pressed:border-input border border-transparent underline underline-offset-4 aria-pressed:no-underline"
                >
                  {language === option.value && <Check aria-hidden="true" />}
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </section>
        </div>
        <footer className="text-muted-foreground relative z-10 mt-auto flex w-full max-w-2xl flex-col items-center gap-5 pt-2 text-center text-sm leading-6">
          <p>
            <a
              href="https://ohc.network"
              className="focus-visible:outline-ring font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Open Healthcare Network (OHC)
            </a>{" "}
            is an open-source public utility built by a multidisciplinary
            community of innovators and volunteers. OHC CARE is a{" "}
            <a
              href="https://www.digitalpublicgoods.net"
              className="focus-visible:outline-ring font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              United Nations-recognised Digital Public Good.
            </a>
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://ohc.network"
              className="focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <img
                src="/brand-assets/uploads/OHC-Logo/SVG/OHC-logotype-on-light-dualtone-gray.svg"
                alt="Open Healthcare Network"
                width={2000}
                height={620}
                loading="lazy"
                className="h-auto w-32 grayscale dark:invert"
              />
            </a>
            <Separator
              orientation="vertical"
              aria-hidden="true"
              className="h-10 data-vertical:self-center"
            />
            <a
              href="https://www.digitalpublicgoods.net"
              className="focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <img
                src="/DPG_logo.svg"
                alt="Digital Public Goods"
                width={90.9}
                height={69.1}
                loading="lazy"
                className="h-12 w-auto grayscale dark:invert"
              />
            </a>
          </div>
        </footer>
      </main>
      <nav
        aria-label="Additional links"
        className="text-primary-foreground flex items-center justify-center gap-8 py-1 text-sm"
      >
        <a
          href="https://github.com/ohcnetwork"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-visible:outline-ring p-2.5 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Contribute on GitHub
        </a>
        <a
          href="https://care.ohc.network/licenses"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-visible:outline-ring p-2.5 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Third-party licenses
        </a>
      </nav>
    </div>
  );
}
