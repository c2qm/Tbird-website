import './IconButton.css';
interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
}

export default function IconButton({ icon, onClick, ariaLabel, className = '' }: IconButtonProps) {
  return (
    <button 
      className={`icon-btn ${className}`} 
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}