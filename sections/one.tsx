import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import useField from "../lib/field";
import SectionLayout from "./common";

export default function SectionOne() {
  const [name, setName] = useField("name");
  const [age, setAge] = useField("age");
  const [gender, setGender] = useField("gender");
  const [howFind, setHowFind] = useField("howFind");

  return (
    <SectionLayout title="A little bit about yourself" index={1} hasNext>
      <FormControl mb={5}>
        <FormLabel>Your real name</FormLabel>
        <Input placeholder="e.g. Zach Latta" value={name} onInput={setName} />
        <FormHelperText>Totally optional.</FormHelperText>
      </FormControl>

      <FormControl isRequired mb={5}>
        <FormLabel>Slack display name</FormLabel>
        <InputGroup>
          <InputLeftAddon>@</InputLeftAddon>
          <Input value="Caleb" disabled readOnly />
        </InputGroup>
        <FormHelperText>
          You can't change this; it's automatically set by your Slack profile.
        </FormHelperText>
      </FormControl>

      <FormControl isRequired mb={5}>
        <FormLabel>Your age</FormLabel>
        <NumberInput value={age} onInput={setAge}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormHelperText>How old am I anyway?</FormHelperText>
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>Your gender identity</FormLabel>
        <Select placeholder="Select option" value={gender} onInput={setGender}>
          <option value="option1">Male</option>
          <option value="option2">Female</option>
          <option value="option3">Other</option>
          <option value="option4">Prefer not to say</option>
        </Select>
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>How did you find Hack Club?</FormLabel>
        <Textarea
          placeholder="Write something..."
          value={howFind}
          onInput={setHowFind}
        />
        <FormHelperText>Friend? AMA? Cow?</FormHelperText>
      </FormControl>
    </SectionLayout>
  );
}
