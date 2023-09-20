interface SidebarProps {
  isOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
  closeSidebar?: boolean;
}

export default function Sidebar({
  isOpen,
  setSidebarOpen,
  closeSidebar,
}: SidebarProps) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <div className={classNames(closeSidebar ? "lg:w-20" : "lg:w-56")}></div>
    </>
  );
}
