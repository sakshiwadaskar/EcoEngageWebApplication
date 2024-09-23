import { FeatureCard } from "./FeatureCard";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CardDetails {
  title: string;
  description: string;
  color: string;
  index: number;
}

const FeatureCardRow = () => {
  const { t } = useTranslation("common");

  // Feature details array
  const cards: CardDetails[] = [
    {
      title: t("treeCampaign"),
      description: t("treeCampaignDescription"),
      color: "#4caf50",
      index: 0,
    },
    {
      title: t("myFeed"),
      description: t("myFeedDescription"),
      color: "#faed27",
      index: 1,
    },
    {
      title: t("globalEmissions"),
      description: t("globalEmissionsDescription"),
      color: "#ff6961",
      index: 2,
    },
    {
      title: t("myProfile"),
      description: t("myProfileDescription"),
      color: "#f0ead6",
      index: 3,
    },
  ];
  return (
    <Box
      sx={{
        height: "50vh",
        width: "100vw",
        paddingLeft: "2vw",
        paddingRight: "2vw",
        backgroundColor: "#121212",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* Iterating through the 3 feature objects and generate a card component for each */}
      {cards.map((card) => (
        <FeatureCard
          title={card.title}
          description={card.description}
          color={card.color}
          index={card.index}
        />
      ))}
    </Box>
  );
};

export default FeatureCardRow;
