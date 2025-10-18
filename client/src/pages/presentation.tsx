import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Maximize2
} from "lucide-react";

export default function Presentation() {
  return (
    <div className="flex-1 p-6 lg:p-8 content-focus" data-testid="page-presentation">
      <div className="space-y-2 mb-8">
        <h1 className="visual-hierarchy-1">Presentation Mode</h1>
        <p className="scan-paragraph text-muted-foreground">
          Create and deliver client presentations
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center spacing-xl py-24">
          <h2 className="visual-hierarchy-2 mb-4">No Presentation Available</h2>
          <p className="scan-paragraph text-muted-foreground text-center mb-8">
            Create a presentation from your client data and financial plans
          </p>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="lg" className="gap-2">
              <Maximize2 className="h-5 w-5" />
              Fullscreen
            </Button>
            <Button size="lg" className="gap-2" data-testid="button-start-presentation">
              <Play className="h-5 w-5" />
              Create Presentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
