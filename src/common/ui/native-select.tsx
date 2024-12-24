"use client";

import { NativeSelect as Select } from "@chakra-ui/react";
import * as React from "react";
import { Skeleton } from "./skeleton";

interface NativeSelectRootProps extends Select.RootProps {
  icon?: React.ReactNode;
}

export const NativeSelectRoot = React.forwardRef<
  HTMLDivElement,
  NativeSelectRootProps
>(function NativeSelect(props, ref) {
  const { icon, children, ...rest } = props;
  return (
    <Select.Root ref={ref} {...rest}>
      {children}
      <Select.Indicator>{icon}</Select.Indicator>
    </Select.Root>
  );
});

interface NativeSelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}

interface NativeSelectField extends Select.FieldProps {
  items?: Array<string | NativeSelectItem>;
  isLoading?: boolean;
}

export const NativeSelectField = React.forwardRef<
  HTMLSelectElement,
  NativeSelectField
>(function NativeSelectField(props, ref) {
  const { isLoading, items: itemsProp, children, ...rest } = props;

  const items = React.useMemo(
    () =>
      itemsProp?.map((item) =>
        typeof item === "string" ? { label: item, value: item } : item,
      ),
    [itemsProp],
  );

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[44px] lg:w-[160px]" />
      ) : (
        <Select.Field ref={ref} {...rest}>
          {children}
          {items?.map((item) => (
            <option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </option>
          ))}
        </Select.Field>
      )}
    </>
  );
});
