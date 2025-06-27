"use client"

import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../libs/utils";

const SelectTrigger = React.forwardRef(({ children, className, onClick, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "flex items-center justify-between w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ placeholder, value, className }) => (
  <span className={cn("text-sm", className)}>
    {value ? value : placeholder}
  </span>
);

const SelectItem = React.forwardRef(({ children, className, value, onSelect, ...props }, ref) => (
  <div
    ref={ref}
    tabIndex={0}
    role="option"
    className={cn(
      "cursor-pointer select-none rounded-md py-2 px-3 text-sm hover:bg-blue-100 hover:text-blue-900 focus:bg-blue-200 focus:text-blue-900 outline-none",
      className
    )}
    onClick={() => onSelect(value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(value);
      }
    }}
    {...props}
  >
    {children}
  </div>
));
SelectItem.displayName = "SelectItem";

const Select = React.forwardRef(({ value, onValueChange, children, placeholder = "Selecione...", className }, ref) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const containerRef = useRef(null);

  React.useImperativeHandle(ref, () => containerRef.current);

  useEffect(() => {
    function onClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  const handleSelect = (val) => {
    onValueChange(val);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <SelectTrigger
        ref={triggerRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <SelectValue value={value} placeholder={placeholder} />
        <svg
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </SelectTrigger>

      {open && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg z-10"
        >
          {React.Children.map(children, (child) => {
            if (child.type?.displayName === "SelectItem") {
              return React.cloneElement(child, { onSelect: handleSelect });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
});
Select.displayName = "Select";

export { Select, SelectItem };
