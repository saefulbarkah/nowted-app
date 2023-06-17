import Container from "@/components/container";
import LoadingIcons from "react-loading-icons";

function loading() {
  return (
    <Container>
      <div className="flex justify-center items-center min-h-screen">
        <LoadingIcons.Oval fontSize={100} />
      </div>
    </Container>
  );
}

export default loading;
