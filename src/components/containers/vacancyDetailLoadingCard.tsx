import VacanciesLoadingCard from "./vacanciesLoadingCard";

const VacancyDetailLoadingCard = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8">
      <div className="lg:w-[30%]">
        <VacanciesLoadingCard />
      </div>
      <div className="lg:w-[70%]">
        <VacanciesLoadingCard />
      </div>
    </div>
  );
};

export default VacancyDetailLoadingCard;
