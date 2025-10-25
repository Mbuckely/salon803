import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeader = ({ title, subtitle, className = "" }: SectionHeaderProps) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
};
