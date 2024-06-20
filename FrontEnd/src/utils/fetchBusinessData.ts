// // src/utils/fetchBusinessData.ts
// import { fetchBusinesses } from '../services/apiService';

// interface Business {
//   type: 'Feature';
//   properties: {};
//   geometry: {
//     type: 'Point';
//     coordinates: [number, number];
//   };
// }

// interface BusinessData {
//   type: 'FeatureCollection';
//   features: Business[];
// }

// const fetchBusinessData = async (catalogueDatasetId: string): Promise<BusinessData | null> => {
//   try {
//     const data1 = await fetchBusinesses({ catalogue_dataset_id: catalogueDatasetId });
//     const formatedData: BusinessData = {
//       type: "FeatureCollection",
//       features: [],
//     };
//     data1?.forEach((x) => {
//       formatedData.features.push({
//         type: "Feature",
//         properties: {},
//         geometry: {
//           type: "Point",
//           coordinates: [
//             x.geometry?.location?.lng,
//             x.geometry?.location?.lat
//           ],
//         },
//       });
//     });
//     return formatedData;
//   } catch (error: any) {
//     console.error(error);
//     return null;
//   }
// };

// export default fetchBusinessData;

export {}