'use client';

import { fetchProperty } from '@/utils/requests';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PropertyPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  return <div>PropertyPage</div>;
};
export default PropertyPage;

// import {
//   useRouter,
//   useParams,
//   useSearchParams,
//   usePathname,
// } from 'next/navigation';

// const Property = () => {
//   const router = useRouter();
//   const { id } = useParams();
//   const searchParams = useSearchParams();
//   const name = searchParams.get('name');
//   const pathname = usePathname();

//   return (
//     <div>
//       <button onClick={() => router.push('/')} className="bg-blue-500 p-2">
//         Go Home
//       </button>
//     </div>
//   );
// };
// export default Property;
