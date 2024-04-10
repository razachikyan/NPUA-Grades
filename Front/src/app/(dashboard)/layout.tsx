import styles from "./styles.module.scss"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className={styles.header}>
        National Polytechnic University of Armenia
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
}
