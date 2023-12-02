import { InitialModal } from "@/components/modals/initial-modal";

import ClientPresenceProvider from "@/components/providers/ClientPresenceProvider";

export default function Home() {
  return (
    <ClientPresenceProvider fileId={null}>
      <div>
        <InitialModal />
      </div>
    </ClientPresenceProvider>
  );
}
