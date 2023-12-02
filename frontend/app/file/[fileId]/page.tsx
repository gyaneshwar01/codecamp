import ChatBox from "@/components/chat/ChatBox";
import { PdfReader } from "@/components/pdf-reader/pdf-reader";

interface ISpecificPageProps {
  params: {
    fileId: string;
  };
}

const SpecificPage = ({ params }: ISpecificPageProps) => {
  const { fileId } = params;

  return (
    <div className="flex flex-row">
      <div className="flex-[3] bg-black h-screen">
        <PdfReader fileId={fileId} />
      </div>
      <div className="flex-[2] h-screen">
        <ChatBox />
      </div>
    </div>
  );
};

export default SpecificPage;
