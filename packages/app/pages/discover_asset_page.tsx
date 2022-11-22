import { useTheme } from "@mui/material";
import { Navigate, useLocation, useParams } from "react-router-dom";
import DefaultView from "@project/components/views/default_view";
import { NavBar } from "@project/components/nav/nav_bar";
import { useSolarFacilities } from "@project/hooks/airtable/use_solar_facilities";
import useNavBar from "@project/hooks/use_nav_bar";
import LoadingView from "@project/components/views/loading_view";
import { ROUTES } from "../routes/routes";
import DiscoverAssetContent from "content/discover_asset_content";

const DiscoverAssetPage = () => {
  const location = useLocation();

  const assetId = location.pathname.split("/").at(-1);

  const { loading, assets } = useSolarFacilities();

  const navBarProps = useNavBar();

  if (loading) {
    return <LoadingView></LoadingView>;
  }

  const asset = assets.some((asset) => asset.id === assetId)
    ? assets.filter((asset) => asset.id === assetId)[0]
    : null;

  if (!asset) {
    return <Navigate to={ROUTES.DISCOVER}></Navigate>;
  }

  return (
    <DefaultView
      navBar={<NavBar {...navBarProps}></NavBar>}
      backgroundColor={"white.main"}
    >
      <DiscoverAssetContent
        asset={asset}
        loading={loading}
      ></DiscoverAssetContent>
    </DefaultView>
  );
};

DiscoverAssetPage.propTypes = {};

export default DiscoverAssetPage;
