import ChatBox from "@/components/chat/ChatBox";

const SpecificPage = () => {
  return (
    <div className="flex flex-row">
      <div className="flex-[2] bg-black h-screen">PDF Preview</div>
      <div className="flex-1 h-screen">
        <ChatBox />
      </div>
    </div>
  );
};

export default SpecificPage;
