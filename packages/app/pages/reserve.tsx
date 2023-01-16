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

  return (
    <ReservePanelPage
      currentPanels={currentPanels}
      setCurrentPanels={setCurrentPanels}
      confirmPanels={confirmPanels}
      currentReservedPanels={currentReservedPanels ? currentReservedPanels : 0}
      costPerPanel={costPerPanel ? costPerPanel : 250}
      maxPanelReservations={maxPanelReservations ? maxPanelReservations : 1000}
    />
  );
};
