import BlogWrapper from "./_components/BlogWrapper";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-16 w-full">
      <BlogWrapper />
      {children}
    </div>
  );
}
