import React, { useMemo, useState } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAllEmployees } from "../hooks/useGetAllEmployees";
import Input from "../../../components/ui/input/Input";
import Select from "../../../components/ui/select/Select";
import Button from "../../../components/ui/button/Button";
import "../styles/ViewEmployees.css";

interface Employee {
  userId: string;
  fullName: string;
  role: string;
  isActive: boolean;
  email: string;
  status: string;
  createdAt: Date;
}

type SortField =
  | "fullName"
  | "email"
  | "role"
  | "status"
  | "isActive"
  | "created_at";
type SortDirection = "asc" | "desc";

const ALL = "All";

export function ViewEmployees() {
  const { data, isLoading, isError, error } = useGetAllEmployees();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [activeFilter, setActiveFilter] = useState(ALL);
  const [sortField, setSortField] = useState<SortField>("fullName");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const navigate = useNavigate();

  //const employees: Employee[] = data ?? [];
  const employees: Employee[] = data?.employees ?? [];

  const roleOptions = useMemo(
    () => [ALL, ...Array.from(new Set(employees.map((e) => e.role)))],
    [employees],
  );

  const statusOptions = useMemo(
    () => [ALL, ...Array.from(new Set(employees.map((e) => e.status)))],
    [employees],
  );

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const visibleEmployees = useMemo(() => {
    const term = search.trim().toLowerCase();

    const filtered = employees.filter((employee) => {
      const matchesSearch =
        !term ||
        employee.fullName.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term);

      const matchesRole = roleFilter === ALL || employee.role === roleFilter;
      const matchesStatus =
        statusFilter === ALL || employee.status === statusFilter;
      const matchesActive =
        activeFilter === ALL ||
        (activeFilter === "Active" ? employee.isActive : !employee.isActive);

      return matchesSearch && matchesRole && matchesStatus && matchesActive;
    });

    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      let comparison = 0;
      if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        comparison = aValue === bValue ? 0 : aValue ? -1 : 1;
      } else if (sortField === "created_at") {
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [
    employees,
    search,
    roleFilter,
    statusFilter,
    activeFilter,
    sortField,
    sortDirection,
  ]);

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field)
      return <ArrowUpDown size={13} className="veSortIconIdle" />;
    return sortDirection === "asc" ? (
      <ArrowUp size={13} className="veSortIconActive" />
    ) : (
      <ArrowDown size={13} className="veSortIconActive" />
    );
  };

  const handleDelete = (userId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );
    if (!confirmed) return;

    // wire up your delete mutation here, e.g.:
    // deleteEmployee(userId);
  };

  const handleViewMore = (userId: string) => {
    navigate(`/employees/${userId}`);
  };

  if (isLoading) {
    return <p>Loading employees...</p>;
  }

  if (isError) {
    return (
      <p>
        {error instanceof Error ? error.message : "Failed to load employees."}
      </p>
    );
  }

  return (
    <div className="viewEmployeesPage">
      <div className="veHeader">
        <h1 className="veTitle">Employees</h1>
        <p className="veSubtitle">
          {visibleEmployees.length} of {employees.length} shown
        </p>
      </div>

      <div className="veToolbar">
        <div className="veSearch">
          <Input
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="veFilters">
          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          />
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <Select
            options={[ALL, "Active", "Inactive"]}
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="veTableWrapper">
        <table className="veTable">
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  className="veSortButton"
                  onClick={() => handleSort("fullName")}
                >
                  Name {renderSortIcon("fullName")}
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="veSortButton"
                  onClick={() => handleSort("email")}
                >
                  Email {renderSortIcon("email")}
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="veSortButton"
                  onClick={() => handleSort("role")}
                >
                  Role {renderSortIcon("role")}
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="veSortButton"
                  onClick={() => handleSort("status")}
                >
                  Status {renderSortIcon("status")}
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="veSortButton"
                  onClick={() => handleSort("isActive")}
                >
                  Active {renderSortIcon("isActive")}
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="veSortButton"
                  onClick={() => handleSort("created_at")}
                >
                  Joined {renderSortIcon("created_at")}
                </button>
              </th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleEmployees.map((employee) => (
              <tr key={employee.userId}>
                <td className="veNameCell">{employee.fullName}</td>
                <td className="veMutedCell">{employee.email}</td>
                <td>{employee.role}</td>
                <td>{employee.status}</td>
                <td>
                  <span
                    className={`veBadge ${
                      employee.isActive ? "veBadgeSuccess" : "veBadgeMuted"
                    }`}
                  >
                    {employee.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="veMutedCell">
                  {new Date(employee.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <div className="veActions">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => handleViewMore(employee.userId)}
                    >
                      View more
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(employee.userId)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleEmployees.length === 0 && (
          <div className="veEmptyState">
            <Search size={18} />
            <span>No employees match your search or filters.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewEmployees;
