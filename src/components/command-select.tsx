import { ReactNode, useState } from "react";

import { ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface CommandSelectProps {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  onSelect,
  options,
  value,
  className,
  onSearch,
  placeholder = "Select an option",
}: CommandSelectProps) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleValueChange = (open: boolean) => {
    onSearch?.("");
    setOpen(open);
  };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div className="">{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleValueChange}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No options found
            </span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
