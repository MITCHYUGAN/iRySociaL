import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateVideoPage = () => {
  const navigate = useNavigate();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {/* <Wallet /> */}
        </EmptyMedia>
        <EmptyTitle>Currently Working on This</EmptyTitle>
        <EmptyDescription>Video creation would be supported soon</EmptyDescription>
      </EmptyHeader>
      <Button
        variant="link"
        className="cursor-pointer"
        onClick={() => {
          navigate("/");
          // disconnect();
        }}
      >
        <ArrowLeft />
        Back
      </Button>
    </Empty>
  );
};

export default CreateVideoPage;
