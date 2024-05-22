import Properties from '@/components/Properties';
import PropertySearchForm from '@/components/PropertySearchForm';
// import { fetchProperties } from '@/utils/requests';

// import properties from '@/properties.json';

const PropertiesList = async () => {
  // const properties = await fetchProperties();

  // // Sort properties by date
  // properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
};
export default PropertiesList;
