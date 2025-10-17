import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Helmet } from "react-helmet";
import { ExternalLink, Mail, Phone, Calendar, MessageSquare } from "lucide-react";

interface Application {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  availability: string;
  social: string;
  message: string;
  resume_path: string | null;
  inserted_at: string;
}

const Admin = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('inserted_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const openResume = (resumePath: string) => {
    const url = `https://mdeugjnzdhwsijylcvts.supabase.co/functions/v1/view-resume?path=${encodeURIComponent(resumePath)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading applications...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin - Applications</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-primary-light to-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-secondary mb-8">
            Job Applications ({applications.length})
          </h1>

          {applications.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-lg text-muted-foreground">No applications yet</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {applications.map((app) => (
                <Card key={app.id} className="p-6 hover:shadow-elegant transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-secondary mb-2">
                        {app.full_name}
                      </h2>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Applied: {new Date(app.inserted_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    {app.resume_path && (
                      <Button 
                        onClick={() => openResume(app.resume_path!)}
                        variant="default"
                        className="gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Resume
                      </Button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <a href={`mailto:${app.email}`} className="text-primary hover:underline">
                        {app.email}
                      </a>
                    </div>
                    {app.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <a href={`tel:${app.phone}`} className="text-primary hover:underline">
                          {app.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {app.availability && (
                    <div className="mb-4">
                      <p className="font-semibold text-sm mb-1">Availability:</p>
                      <p className="text-foreground">{app.availability}</p>
                    </div>
                  )}

                  {app.social && (
                    <div className="mb-4">
                      <p className="font-semibold text-sm mb-1">Social Media:</p>
                      <p className="text-foreground">{app.social}</p>
                    </div>
                  )}

                  {app.message && (
                    <div className="bg-primary-light/30 p-4 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-primary mt-1" />
                        <p className="font-semibold text-sm">Message:</p>
                      </div>
                      <p className="text-foreground whitespace-pre-wrap">{app.message}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
