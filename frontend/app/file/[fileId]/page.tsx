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
      <div className="flex-[3] h-screen">
        <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
          <PdfReader fileId={fileId} />
        </div>
      </div>
      <div className="flex-[2] h-screen">
        <ChatBox />
      </div>
    </div>
  );
};

export default SpecificPage;
