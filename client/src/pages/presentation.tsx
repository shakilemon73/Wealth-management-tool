import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PresentationIcon, 
  Play, 
  ChevronLeft, 
  ChevronRight,
  Maximize2
} from "lucide-react";

export default function Presentation() {
  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8" data-testid="page-presentation">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-h1 font-semibold text-foreground">
            Presentation Mode
          </h1>
          <p className="text-muted-foreground mt-1">
            Create cinematic presentations for client meetings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Maximize2 className="h-4 w-4" />
            Fullscreen
          </Button>
          <Button className="gap-2" data-testid="button-start-presentation">
            <Play className="h-4 w-4" />
            Start Presentation
          </Button>
        </div>
      </div>

      <Card className="hover-elevate transition-all duration-300">
        <CardContent className="flex flex-col items-center justify-center py-24 px-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-1 mb-6">
            <PresentationIcon className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Cinematic Client Presentations
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mb-8">
            Create stunning visual presentations that tell your client's financial story. 
            Combine charts, projections, and insights into a smooth, professional presentation flow.
          </p>
          
          <div className="grid gap-4 md:grid-cols-3 w-full max-w-3xl mt-8">
            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-3">
                <Play className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Smooth Transitions</h3>
              <p className="text-sm text-muted-foreground">
                Professional animations between slides
              </p>
            </div>

            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10 mx-auto mb-3">
                <PresentationIcon className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Visual Storytelling</h3>
              <p className="text-sm text-muted-foreground">
                Data becomes engaging narratives
              </p>
            </div>

            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/10 mx-auto mb-3">
                <Maximize2 className="h-6 w-6 text-chart-1" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fullscreen Mode</h3>
              <p className="text-sm text-muted-foreground">
                Immersive client meeting experience
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-12">
            <Button variant="outline" size="lg" className="gap-2">
              <ChevronLeft className="h-5 w-5" />
              Previous Slide
            </Button>
            <Button size="lg" className="gap-2">
              <Play className="h-5 w-5" />
              Start Demo
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              Next Slide
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
