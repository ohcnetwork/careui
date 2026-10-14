import * as React from "react";
import {
  Lightbulb,
  Plus,
  Settings2,
  Trash2,
  Variable,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

import { catalogById, type FieldSchema } from "./catalog";
import { usePrototypeStore, useSelectedElement, useCurrentPage } from "./store";
import type {
  ActionType,
  ConditionOp,
  PrototypeAction,
  PrototypeElement,
  TransitionType,
  TriggerType,
} from "./types";

const ACTION_LABELS: Record<ActionType, string> = {
  navigate: "Navigate to page",
  back: "Go back",
  openModal: "Open modal",
  closeModal: "Close modal",
  showComponent: "Show component",
  hideComponent: "Hide component",
  toggleComponent: "Toggle component",
  showToast: "Show toast",
  setVariable: "Set variable",
  delay: "Delay / wait",
};

const TRIGGERS: TriggerType[] = ["click", "change", "hover", "submit"];
const TRANSITIONS: TransitionType[] = [
  "none",
  "slide-left",
  "slide-right",
  "slide-up",
  "fade",
];

// A native <select> styled to match the design system — keeps values simple.
function Select({
  value,
  onChange,
  children,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "border-input bg-background focus-visible:ring-ring/50 h-8 w-full rounded-md border px-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]",
        className
      )}
    >
      {children}
    </select>
  );
}

export function InteractionPanel() {
  const selected = useSelectedElement();

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {selected ? (
        <ElementInspector element={selected.element} />
      ) : (
        <PageInspector />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Element inspector: properties + interactions + smart suggestions
// ---------------------------------------------------------------------------

function ElementInspector({ element }: { element: PrototypeElement }) {
  const { dispatch } = usePrototypeStore();
  const item = catalogById[element.type];

  return (
    <div className="divide-y">
      <div className="flex items-center gap-2 p-3">
        <Settings2 className="text-muted-foreground size-4" />
        <Input
          value={element.name}
          onChange={(e) =>
            dispatch({
              t: "updateElement",
              id: element.id,
              patch: { name: e.target.value },
            })
          }
          className="h-8"
        />
      </div>

      {/* Properties */}
      {item?.fields.length ? (
        <Section title="Properties">
          <div className="grid gap-3">
            {item.fields.map((field) => (
              <FieldEditor key={field.key} field={field} element={element} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Behaviour toggles */}
      <Section title="Behaviour">
        <div className="grid gap-2.5">
          <ToggleRow
            label="Hidden by default"
            hint="Reveal with a Show / Toggle action"
            checked={!!element.hidden}
            onChange={(v) =>
              dispatch({
                t: "updateElement",
                id: element.id,
                patch: { hidden: v },
              })
            }
          />
          <ToggleRow
            label="Behaves as modal"
            hint="Renders as a centered overlay when shown"
            checked={!!element.isModal}
            onChange={(v) =>
              dispatch({
                t: "updateElement",
                id: element.id,
                patch: { isModal: v },
              })
            }
          />
        </div>
      </Section>

      {/* Smart suggestions */}
      {item?.suggestions?.length ? (
        <Section
          title="Smart suggestions"
          icon={<Lightbulb className="size-3.5 text-amber-500" />}
        >
          <div className="flex flex-wrap gap-1.5">
            {item.suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() =>
                  dispatch({
                    t: "addAction",
                    elementId: element.id,
                    action: s.action,
                  })
                }
                className="text-foreground rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-medium transition-colors hover:bg-amber-500/20"
              >
                + {s.label}
              </button>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Interactions */}
      <Section
        title="Interactions"
        icon={<Zap className="text-primary size-3.5" />}
        action={
          <Button
            size="sm"
            variant="ghost"
            className="h-7"
            onClick={() => dispatch({ t: "addAction", elementId: element.id })}
          >
            <Plus className="size-3.5" /> Add
          </Button>
        }
      >
        {element.actions.length === 0 ? (
          <p className="text-muted-foreground text-xs">
            No interactions yet. Add one to make this component respond to
            clicks, changes or hovers.
          </p>
        ) : (
          <div className="space-y-3">
            {element.actions.map((action, i) => (
              <ActionEditor
                key={action.id}
                element={element}
                action={action}
                index={i}
              />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

function FieldEditor({
  field,
  element,
}: {
  field: FieldSchema;
  element: PrototypeElement;
}) {
  const { state, dispatch } = usePrototypeStore();
  const value = (element.props[field.key] as string) ?? "";
  const set = (v: string | boolean) =>
    dispatch({ t: "updateProps", id: element.id, props: { [field.key]: v } });

  if (field.type === "boolean") {
    return (
      <ToggleRow
        label={field.label}
        checked={value === "true"}
        onChange={(v) => set(v ? "true" : "false")}
      />
    );
  }
  if (field.type === "textarea") {
    return (
      <div className="grid gap-1">
        <Label className="text-xs">{field.label}</Label>
        <Textarea
          value={value}
          onChange={(e) => set(e.target.value)}
          className="min-h-16 text-sm"
        />
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <div className="grid gap-1">
        <Label className="text-xs">{field.label}</Label>
        <Select value={value} onChange={set}>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>
      </div>
    );
  }
  if (field.type === "variable") {
    return (
      <div className="grid gap-1">
        <Label className="text-xs">{field.label}</Label>
        <Input
          list="proto-variables"
          value={value}
          placeholder="Variable name"
          onChange={(e) => set(e.target.value)}
          className="h-8"
        />
        <datalist id="proto-variables">
          {state.variables.map((v) => (
            <option key={v.name} value={v.name} />
          ))}
        </datalist>
      </div>
    );
  }
  return (
    <div className="grid gap-1">
      <Label className="text-xs">{field.label}</Label>
      <Input
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => set(e.target.value)}
        className="h-8"
      />
    </div>
  );
}

function ActionEditor({
  element,
  action,
  index,
}: {
  element: PrototypeElement;
  action: PrototypeAction;
  index: number;
}) {
  const { state, dispatch } = usePrototypeStore();
  const page = useCurrentPage();
  const patch = (p: Partial<PrototypeAction>) =>
    dispatch({
      t: "updateAction",
      elementId: element.id,
      actionId: action.id,
      patch: p,
    });

  const needsPage = action.type === "navigate";
  const needsElement = [
    "showComponent",
    "hideComponent",
    "toggleComponent",
    "openModal",
    "closeModal",
  ].includes(action.type);
  const needsMessage = action.type === "showToast";
  const needsVar = action.type === "setVariable";
  const needsDuration = action.type === "delay" || action.type === "navigate";

  return (
    <div className="bg-muted/40 rounded-lg border p-2.5">
      <div className="mb-2 flex items-center gap-2">
        <span className="bg-primary/10 text-primary grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-semibold">
          {index + 1}
        </span>
        <span className="text-muted-foreground text-xs">When</span>
        <Select
          value={action.trigger}
          onChange={(v) => patch({ trigger: v as TriggerType })}
          className="h-7 flex-1"
        >
          {TRIGGERS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
        <button
          className="text-muted-foreground hover:text-destructive"
          title="Remove interaction"
          onClick={() =>
            dispatch({
              t: "deleteAction",
              elementId: element.id,
              actionId: action.id,
            })
          }
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground w-8 shrink-0 text-xs">Do</span>
          <Select
            value={action.type}
            onChange={(v) => patch({ type: v as ActionType })}
            className="h-7 flex-1"
          >
            {(Object.keys(ACTION_LABELS) as ActionType[]).map((t) => (
              <option key={t} value={t}>
                {ACTION_LABELS[t]}
              </option>
            ))}
          </Select>
        </div>

        {needsPage && (
          <LabeledSelect
            label="To"
            value={action.targetPageId ?? ""}
            onChange={(v) => patch({ targetPageId: v })}
            placeholder="Select page…"
            options={state.pages.map((p) => ({ value: p.id, label: p.name }))}
          />
        )}
        {needsElement && (
          <LabeledSelect
            label="Target"
            value={action.targetElementId ?? ""}
            onChange={(v) => patch({ targetElementId: v })}
            placeholder="Select component…"
            options={page.elements
              .filter((e) => e.id !== element.id)
              .map((e) => ({ value: e.id, label: e.name }))}
          />
        )}
        {needsMessage && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground w-8 shrink-0 text-xs">
              Msg
            </span>
            <Input
              value={action.value ?? ""}
              placeholder="Toast message"
              onChange={(e) => patch({ value: e.target.value })}
              className="h-7"
            />
          </div>
        )}
        {needsVar && (
          <>
            <LabeledSelect
              label="Var"
              value={action.variableName ?? ""}
              onChange={(v) => patch({ variableName: v })}
              placeholder="Select variable…"
              options={state.variables.map((v) => ({
                value: v.name,
                label: v.name,
              }))}
            />
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-8 shrink-0 text-xs">
                =
              </span>
              <Input
                value={action.value ?? ""}
                placeholder="Value"
                onChange={(e) => patch({ value: e.target.value })}
                className="h-7"
              />
            </div>
          </>
        )}
        {action.type === "navigate" && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground w-8 shrink-0 text-xs">
              Anim
            </span>
            <Select
              value={action.transition ?? "none"}
              onChange={(v) => patch({ transition: v as TransitionType })}
              className="h-7 flex-1"
            >
              {TRANSITIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
        )}
        {needsDuration && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground w-8 shrink-0 text-xs">
              ms
            </span>
            <Input
              type="number"
              value={action.duration ?? 250}
              onChange={(e) => patch({ duration: Number(e.target.value) })}
              className="h-7"
            />
          </div>
        )}

        {/* Optional condition */}
        <ConditionEditor
          action={action}
          onPatch={patch}
          variables={state.variables.map((v) => v.name)}
        />
      </div>
    </div>
  );
}

function ConditionEditor({
  action,
  onPatch,
  variables,
}: {
  action: PrototypeAction;
  onPatch: (p: Partial<PrototypeAction>) => void;
  variables: string[];
}) {
  const cond = action.condition;
  if (!cond) {
    return (
      <button
        className="text-muted-foreground hover:text-foreground w-fit text-xs underline-offset-2 hover:underline"
        onClick={() =>
          onPatch({
            condition: { variable: variables[0] ?? "", op: "notEmpty" },
          })
        }
      >
        + Add condition
      </button>
    );
  }
  return (
    <div className="border-primary/30 bg-background grid gap-2 rounded-md border border-dashed p-2">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-[11px] font-semibold uppercase">
          Only if
        </span>
        <button
          className="text-muted-foreground hover:text-destructive"
          onClick={() => onPatch({ condition: undefined })}
        >
          <Trash2 className="size-3" />
        </button>
      </div>
      <Select
        value={cond.variable}
        onChange={(v) => onPatch({ condition: { ...cond, variable: v } })}
        className="h-7"
      >
        {variables.length === 0 && <option value="">No variables</option>}
        {variables.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </Select>
      <Select
        value={cond.op}
        onChange={(v) =>
          onPatch({ condition: { ...cond, op: v as ConditionOp } })
        }
        className="h-7"
      >
        <option value="eq">equals</option>
        <option value="neq">does not equal</option>
        <option value="empty">is empty</option>
        <option value="notEmpty">is not empty</option>
      </Select>
      {(cond.op === "eq" || cond.op === "neq") && (
        <Input
          value={cond.value ?? ""}
          placeholder="Value"
          onChange={(e) =>
            onPatch({ condition: { ...cond, value: e.target.value } })
          }
          className="h-7"
        />
      )}
    </div>
  );
}

function LabeledSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground w-8 shrink-0 text-xs">
        {label}
      </span>
      <Select value={value} onChange={onChange} className="h-7 flex-1">
        <option value="">{placeholder ?? "Select…"}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page inspector (nothing selected): page settings + variables
// ---------------------------------------------------------------------------

function PageInspector() {
  const { state, dispatch } = usePrototypeStore();
  const page = useCurrentPage();
  const [newVar, setNewVar] = React.useState("");

  return (
    <div className="divide-y">
      <Section title="Prototype">
        <div className="grid gap-1">
          <Label className="text-xs">Name</Label>
          <Input
            value={state.name}
            onChange={(e) => dispatch({ t: "renameDoc", name: e.target.value })}
            className="h-8"
          />
        </div>
      </Section>

      <Section title="Current page">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="text-xs">Name</Label>
            <Input
              value={page.name}
              onChange={(e) =>
                dispatch({ t: "renamePage", id: page.id, name: e.target.value })
              }
              className="h-8"
            />
          </div>
          <ToggleRow
            label="Start page"
            hint="The player opens here"
            checked={state.startPageId === page.id}
            onChange={() => dispatch({ t: "setStartPage", id: page.id })}
          />
          <p className="text-muted-foreground text-xs">
            {page.elements.length} component
            {page.elements.length === 1 ? "" : "s"} · select one to edit its
            properties and interactions.
          </p>
        </div>
      </Section>

      <Section
        title="Variables"
        icon={<Variable className="text-muted-foreground size-3.5" />}
      >
        <p className="text-muted-foreground mb-2 text-xs">
          Temporary values captured during a run. Reset every time the player
          restarts.
        </p>
        <div className="space-y-1.5">
          {state.variables.map((v, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Badge
                variant="neutral"
                className="max-w-24 shrink-0 truncate font-mono text-[11px]"
              >
                {v.name}
              </Badge>
              <Input
                value={v.value}
                placeholder="value"
                onChange={(e) =>
                  dispatch({
                    t: "updateVariable",
                    index: i,
                    value: e.target.value,
                  })
                }
                className="h-7 text-sm"
              />
              <button
                className="text-muted-foreground hover:text-destructive"
                onClick={() => dispatch({ t: "deleteVariable", index: i })}
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
        <form
          className="mt-2 flex items-center gap-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (newVar.trim()) {
              dispatch({ t: "addVariable", name: newVar.trim() });
              setNewVar("");
            }
          }}
        >
          <Input
            value={newVar}
            onChange={(e) => setNewVar(e.target.value)}
            placeholder="New variable…"
            className="h-7 text-sm"
          />
          <Button
            type="submit"
            size="icon-sm"
            variant="outline"
            className="size-7"
          >
            <Plus className="size-3.5" />
          </Button>
        </form>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------

function Section({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="p-3">
      <div className="mb-2 flex items-center gap-1.5">
        {icon}
        <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          {title}
        </h3>
        {action && <div className="ml-auto">{action}</div>}
      </div>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <div className="min-w-0 flex-1">
        <div className="text-sm">{label}</div>
        {hint && <div className="text-muted-foreground text-xs">{hint}</div>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}
