import { Checkbox, FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";
import useField from "../lib/field";
import SectionLayout from "./common";

export default function SectionTwo() {
  const editors = {
    vscode: "Visual Studio Code",
    vs: "Visual Studio",
    jetbrains: "JetBrains (IntelliJ, WebStorm, etc.)",
    vim: "Vim",
    atom: "Atom",
  };
  const [editor, setEditor] = useField("editor");
  const [usesVim, setUsesVim] = useField("usesVim");
  const [language, setLanguage] = useField("language");
  const [framework, setFramework] = useField("framework");

  return (
    <SectionLayout title="Your preferred tooling" index={2} hasPrevious>
      <FormControl mb={5}>
        <FormLabel>Which editor do you generally code in?</FormLabel>
        <Select placeholder="Select option" value={editor} onInput={setEditor}>
          {Object.entries(editors).map(([key, value]) => (
            <option value={key} key={key}>
              {value}
            </option>
          ))}
        </Select>
      </FormControl>

      {editor && editor != "vim" && (
        <Checkbox
          mb={5}
          isChecked={!!usesVim}
          onInput={(e) => setUsesVim((e.target as any).checked ? "" : "true")}
        >
          Do you make use of Vim keybindings in {editors[editor]}?
        </Checkbox>
      )}

      <FormControl mb={5}>
        <FormLabel>
          Which language would you say you enjoy working with the most?
        </FormLabel>
        <Select
          placeholder="Select option"
          value={language}
          onInput={setLanguage}
        >
          <option value="rust">Rust</option>
          <option value="go">Go</option>
          <option value="js">JavaScript/TypeScript</option>
          <option value="python">Python</option>
          <option value="ruby">Ruby</option>
          <option value="dart">Dart</option>
          <option value="swift">Swift</option>
          <option value="html">HTML/CSS</option>
        </Select>
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>
          Which JavaScript framework, if any, do you prefer?
        </FormLabel>
        <Select
          placeholder="Select option"
          value={framework}
          onInput={setFramework}
        >
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="svelte">Svelte</option>
          <option value="angular">Angular</option>
        </Select>
      </FormControl>
    </SectionLayout>
  );
}
