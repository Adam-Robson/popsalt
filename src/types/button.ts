
export type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset' | undefined;
  tooltip?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'ghost';
  children?: React.ReactNode;
};
