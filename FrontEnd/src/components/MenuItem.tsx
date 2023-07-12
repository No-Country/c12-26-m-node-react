/* eslint-disable jsx-a11y/no-static-element-interactions */
interface MenuItemsProps {
  onClick: () => void;
  label: string;
}

function MenuItem({ onClick, label }: MenuItemsProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      onClick={onClick}
      className="px-5 py-4 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </div>
  );
}

export default MenuItem;
