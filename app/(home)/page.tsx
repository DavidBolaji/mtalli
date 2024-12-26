

export const revalidate = 0;

interface HomeSearchParams {
  [key: string]: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: HomeSearchParams;
}) {
 

  return (
    <div className="bg-grey-200">
     Hello
    </div>
  );
}
