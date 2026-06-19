"use client";
import { useState } from "react";
import { Filters } from "careui";
import type { Filter, FilterFieldConfig } from "careui";

const statusField: FilterFieldConfig = {
  key: "status",
  label: "Status",
  type: "multiselect",
  options: [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ],
};

const departmentField: FilterFieldConfig = {
  key: "department",
  label: "Department",
  type: "select",
  options: [
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "orthopedics", label: "Orthopedics" },
  ],
};

const nameField: FilterFieldConfig = {
  key: "name",
  label: "Name",
  type: "text",
};

const fields = [statusField, departmentField, nameField];

export function Default() {
  const [filters, setFilters] = useState<Filter[]>([]);
  return (
    <Filters filters={filters} fields={fields} onChange={setFilters} />
  );
}

export function WithActiveFilters() {
  const [filters, setFilters] = useState<Filter[]>([
    { id: "1", field: "status", operator: "is_any_of", values: ["active"] },
    { id: "2", field: "department", operator: "is", values: ["cardiology"] },
  ]);
  return (
    <Filters filters={filters} fields={fields} onChange={setFilters} />
  );
}

export function SmallSize() {
  const [filters, setFilters] = useState<Filter[]>([]);
  return (
    <Filters
      filters={filters}
      fields={fields}
      onChange={setFilters}
      size="sm"
    />
  );
}
