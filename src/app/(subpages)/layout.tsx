import Footer from "@/components/layout/Footer/Footer";
import Backbutton from "@/components/ui/Backbutton";
import { Container } from "@mantine/core";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container size="xl" pt="3em" className="w-full subpagesContainer ">
      <Backbutton />
      {children}
      <Footer />
    </Container>
  );
}
