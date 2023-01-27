import { useState } from "react";

export const Page = ({ registerSection }: { registerSection: any }) => {
  const [someCondition, setSomeCondition] = useState(false);

  return (
    <>
      <h1 {...registerSection("Title")}>Vite + React</h1>
      <button
        onClick={() => {
          setSomeCondition(!someCondition);
        }}
      >
        Toggle conditional
      </button>
      <section {...registerSection("Section 1")}>
        <h2>Section 1</h2>
        <section {...registerSection("Sub-section 1")}>
          <h3>Sub-section</h3>
          <p>A test paragraph</p>
        </section>
      </section>
      <section {...registerSection("Section 2")}>
        <h2>Section 2</h2>
        <section {...registerSection("Sub-section 2")}>
          <h3>Sub-section</h3>
          <p>A test paragraph</p>
        </section>
        <section {...registerSection("Sub-section 3")}>
          <h3>Sub-section</h3>
          <p>A test paragraph</p>
        </section>
      </section>
      {someCondition && <section {...registerSection("Conditional")} />}
      <footer {...registerSection("Footer")}>
        <p>Footer</p>
      </footer>
    </>
  );
};
