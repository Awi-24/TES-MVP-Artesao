import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../libs/utils";

const SelectGroup = ({ children, className, ...props }) => (
  <div className={cn("p-1", className)} {...props}>
    {children}
  </div>
);

const SelectTrigger = React.forwardRef(({ children, className, onClick, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "flex items-center justify-between w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
));

const SelectValue = ({ children, className, placeholder, value }) => (
  <span className={cn("text-sm", className)}>
    {value ? children : placeholder}
  </span>
);

const SelectContent = React.forwardRef(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Fundo branco sólido para melhor contraste
      "absolute mt-1 z-50 min-w-[8rem] max-h-60 overflow-auto rounded-lg border border-gray-300 bg-white text-gray-900 shadow-lg animate-in fade-in-center-down",
      // scrollbar customizada suave (opcional, pode remover se quiser)
      "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

const SelectLabel = ({ children, className, ...props }) => (
  <div className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold text-gray-700", className)} {...props}>
    {children}
  </div>
);

const SelectItem = React.forwardRef(({ children, className, value, onSelect, ...props }, ref) => (
  <div
    ref={ref}
    tabIndex={0}
    role="option"
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-md py-2 px-3 text-sm outline-none",
      // Hover com fundo azul claro e texto escuro para destaque
      "hover:bg-blue-100 hover:text-blue-900",
      // Foco com anel azul para acessibilidade
      "focus:bg-blue-200 focus:text-blue-900 focus:outline-none",
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

const SelectSeparator = ({ className, ...props }) => (
  <div className={cn("-mx-1 my-1 h-px bg-gray-200", className)} {...props} />
);

const SelectScrollUpButton = ({ className, ...props }) => (
  <div
    className={cn(
      "flex items-center justify-center h-6 w-full cursor-default rounded-t py-0.5 text-sm opacity-50 group-hover:opacity-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
);

const SelectScrollDownButton = ({ className, ...props }) => (
  <div
    className={cn(
      "flex items-center justify-center h-6 w-full cursor-default rounded-b py-0.5 text-sm opacity-50 group-hover:opacity-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
);

const Select = ({ value, onValueChange, children, placeholder = "Selecione...", className }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    function onClickOutside(event) {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
    } else {
      document.removeEventListener("mousedown", onClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  let selectedLabel = null;
  React.Children.forEach(children, (child) => {
    if (child.type === SelectItem && child.props.value === value) {
      selectedLabel = child.props.children;
    }
  });

  const handleSelect = (val) => {
    onValueChange(val);
    setOpen(false);
  };

  return (
    <div className={cn("relative inline-block w-full", className)}>
      <SelectTrigger
        ref={triggerRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <SelectValue value={value} placeholder={placeholder}>
          {selectedLabel}
        </SelectValue>
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
        <SelectContent ref={contentRef} role="listbox" tabIndex={-1}>
          {React.Children.map(children, (child) => {
            if (child.type === SelectItem) {
              return React.cloneElement(child, { onSelect: handleSelect });
            }
            if (child.type === SelectLabel) {
              return child;
            }
            return child;
          })}
        </SelectContent>
      )}
    </div>
  );
};

export {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
