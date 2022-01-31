export function Container({ children, className, ...props }) {
  return <div className={["max-w-screen-lg px-4", className].filter(Boolean).join(" ")}>
    {children}
  </div>
}