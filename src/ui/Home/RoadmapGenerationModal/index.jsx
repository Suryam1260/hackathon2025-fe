import { useSelector } from "react-redux"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const RoadmapGenerationModal = () => {
  const roadmapGeneration = useSelector((state) => state.roadmap.roadmapGeneration);

  // Subscribe to updates for the current generating roadmap and log to console
  if (roadmapGeneration === null) {
    return null;
  }

//   Sample data = {
//     "message": "Roadmap generation started",
//     "job_id": "06e4f991-b205-4610-8a7a-bc814e7f4526",
//     "estimated_time": "2-5 minutes",
//     "roadmap_id": 52,
//     "status": "generating"
// }


//We want to show a modal with the following information:
// 1. Roadmap generation started
// 3. Estimated time
// 5. Status

// and this modal should be open only when the status is generating
// and its a blocking modal i.e. the user cannot interact with the page until the modal is closed

  return (
    <div>
      <Dialog
        open={roadmapGeneration.status === "generating"}
        onOpenChange={() => {}}
      >
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Roadmap generation started</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RoadmapGenerationModal;
