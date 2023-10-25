"use client";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { IUser } from "@/types/IUser";
import DebouncedInput from "@/components/ui/debounced-input";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { IParams } from "@/types/IParams";
import { getUsers } from "@/redux/services/users";
import Filter from "@/components/table/users-table/filter/Filter";
import EditUser from "@/components/table/users-table/edit-user/EditUser";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }

  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

const UsersTable = () => {
  const { value, loading, error } = useAppSelector(
    (state) => state.usersReducer
  );
  const dispatch = useAppDispatch();
  const [params, setParams] = useState<IParams>({
    limit: 10,
    offset: 0,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<IUser, any>[]>(
    () => [
      {
        header: "Users Info",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "name",
            header: () => "Name",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "email",
            header: () => "Email",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "phone_number",
            header: () => "Phone",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "birthday_date",
            header: () => "Birthday",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "address",
            header: () => "Address",
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Actions",
        columns: [
          {
            accessorKey: "actions",
            header: () => "Edit",
            cell: (props: any) => <EditUser data={props.row.original} />,
          },
        ],
      },
    ],
    [params]
  );

  const table = useReactTable({
    data: value?.results,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  useEffect(() => {
    dispatch(getUsers(params));
  }, [params]);

  if (value?.results.length === 0 && !loading && error) {
    return <h2 className="text-center">Opps! {error}</h2>;
  }

  return (
    <div className="py-5">
      <div>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow mb-5 rounded w-full bg-custom-white"
          placeholder="Search all columns..."
        />
      </div>

      <table className={"w-full bg-custom-white shadow rounded p-2"}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none w-full"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " ⇧",
                            desc: " ⇩",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() &&
                        header.id !== "actions" ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center gap-2 mt-5">
        <button
          className={`border rounded p-2 hover:bg-custom-white`}
          onClick={() => setParams((prev) => ({ ...prev, offset: 0 }))}
          disabled={params.offset === 0}
        >
          {"<<"}
        </button>
        <button
          className={`border rounded p-2 hover:bg-custom-white`}
          onClick={() =>
            setParams((prev) => ({
              ...prev,
              offset:
                prev.offset - prev.limit < 0 ? 0 : prev.offset - prev.limit,
            }))
          }
          disabled={params.offset === 0}
        >
          {"<"}
        </button>
        <button
          className={`border rounded p-2 hover:bg-custom-white`}
          onClick={() =>
            setParams((prev) => ({
              ...prev,
              offset:
                prev.offset + prev.limit > value?.count
                  ? prev.offset
                  : prev.offset + prev.limit,
            }))
          }
          disabled={params.offset + params.limit >= value?.count}
        >
          {">"}
        </button>
        <button
          className={`border rounded p-2 hover:bg-custom-white`}
          onClick={() =>
            setParams((prev) => ({
              ...prev,
              offset: value?.count - prev.limit,
            }))
          }
          disabled={params.offset + params.limit >= value?.count}
        >
          {">>"}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {Math.floor(params.offset / params.limit) + 1} of{" "}
            {Math.floor(value?.count / params.limit)}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <Input
            type="number"
            max={Math.ceil(value?.count / params.limit)}
            min={1}
            defaultValue={1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setParams((prev) => ({ ...prev, offset: page * prev.limit }));
            }}
            className="border p-1 rounded w-16 text-center"
          />
        </span>
        <Select
          defaultValue={params.limit.toString()}
          onValueChange={(value: string) => {
            table.setPageSize(+value);
            setParams((prev) => ({ ...prev, limit: +value }));
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                Show {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UsersTable;
