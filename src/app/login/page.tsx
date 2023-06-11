import Auth from "@/components/AuthPages/Auth";

export default async function page() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <Auth />
      </div>
    </>
  );
}
