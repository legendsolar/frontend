import { useReservations } from "utility/use_reservations";

import { ReservePanelPage } from "@project/components/pages/reserve_panel_page";

export default () => {
  const {
    loading,
    currentPanels,
    setCurrentPanels,
    costPerPanel,
    currentReservedPanels,
    maxPanelReservations,
    confirmPanels,
  } = useReservations();

  console.log({ loading, currentReservedPanels });

  if (loading) {
    return <div></div>;
  }

  return (
    <ReservePanelPage
      currentPanels={currentPanels}
      setCurrentPanels={setCurrentPanels}
      confirmPanels={confirmPanels}
      currentReservedPanels={currentReservedPanels}
      costPerPanel={costPerPanel}
      maxPanelReservations={maxPanelReservations}
    />
  );
};
