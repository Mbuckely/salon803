import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
}

export const ServiceCard = ({ title, description, price }: ServiceCardProps) => {
  return (
    <Card className="shadow-card hover:shadow-elegant transition-smooth hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-xl text-secondary">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary">{price}</p>
      </CardContent>
    </Card>
  );
};
