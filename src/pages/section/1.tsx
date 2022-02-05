import { Props } from "../../lib/sectionProps";

import {
  Checkbox,
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
  VStack,
} from "@chakra-ui/react";
import React from "react";
import useField from "../../lib/field";
import SectionLayout from "../../layouts/Section";

export default function SectionOne({ user }: Props) {
  const [name, setName] = useField("name", user.userName);
  const [age, setAge] = useField<number>("age", null);
  const [gender, setGender] = useField("gender", "");
  const [howFind, setHowFind] = useField("howFind", "");

  const [hackClubber, setHackClubber] = useField("hackClubber", false);
  const [hq, setHq] = useField("hq", false);
  const [partTimeHq, setPartTimeHq] = useField("partTimeHq", false);
  const [alumni, setAlumni] = useField("alumni", false);

  return (
    <SectionLayout title="A little bit about yourself" index={1} hasNext>
      <FormControl mb={5}>
        <FormLabel>Your real name</FormLabel>
        <Input
          placeholder="e.g. Zach Latta"
          value={name}
          onInput={setName}
          autoFocus
        />
        <FormHelperText>Totally optional.</FormHelperText>
      </FormControl>

      <FormControl isRequired mb={5}>
        <FormLabel>Slack display name</FormLabel>
        <InputGroup>
          <InputLeftAddon>@</InputLeftAddon>
          <Input value={user.userName} disabled readOnly />
        </InputGroup>
        <FormHelperText>
          You can't change this; it's automatically set by your Slack profile.
        </FormHelperText>
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>Your age</FormLabel>
        <NumberInput
          value={age === null ? "" : age}
          onChange={(_, v) => setAge(isNaN(v) ? null : v)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormHelperText>How old am I anyway?</FormHelperText>
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>Your preferred pronouns</FormLabel>
        <Select placeholder="Select option" value={gender} onInput={setGender}>
          <option value="he">He/him</option>
          <option value="her">She/her</option>
          <option value="they">They/them</option>
          <option value="other">Other</option>
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

      <FormControl mb={5}>
        <FormLabel>What are you?</FormLabel>
        <VStack spacing={1} align="start">
          <Checkbox
            isChecked={!!hackClubber}
            onChange={(e) => setHackClubber(e.target.checked)}
          >
            A Hack Clubber
          </Checkbox>
          <Checkbox isChecked={!!hq} onChange={(e) => setHq(e.target.checked)}>
            A full-time staff member
          </Checkbox>
          <Checkbox
            isChecked={!!partTimeHq}
            onChange={(e) => setPartTimeHq(e.target.checked)}
          >
            A part-time HQ contributor
          </Checkbox>
          <Checkbox
            isChecked={!!alumni}
            onChange={(e) => setAlumni(e.target.checked)}
          >
            A post-high-school Hack Club alumni
          </Checkbox>
        </VStack>
        <FormHelperText>Check as many as you think apply.</FormHelperText>
      </FormControl>
    </SectionLayout>
  );
}

export { getServerSideProps } from "../../lib/sectionProps";
