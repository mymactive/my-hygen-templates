//
// yarn new:sfc -- --tag=p
//
/* eslint-disable @typescript-eslint/no-var-requires  */
/* eslint-disable @typescript-eslint/no-unused-vars  */
module.exports = {
  prompt: ({ inquirer, _args }) => {
    const questions = [
      {
        type: "input",
        name: "dir",
        message:
          "どのディレクトリに作成しますか？(Where is tha directory?) ex: src/common/components/",
      },
      {
        type: "input",
        name: "component_name",
        message:
          "コンポーネント名は何ですか？(What is the name of component?) ex: Button",
      },
      {
        type: "confirm",
        name: "have_props",
        message: "Propsは持ちますか？(Is it have props?)",
        choices: ["Yes", "No"],
        initial: "Yes",
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { dir, component_name, have_props } = answers;
      const { join } = require("path");

      const path = join(`${dir || "src/"}`, "/", component_name);
      const type_annotate = have_props ? "FC<Props>" : "FC";
      const props = have_props ? "(props)" : "()";
      const story_types = have_props
        ? "ComponentMeta, type ComponentStory"
        : "type Meta, type Story";
      return { ...answers, path, type_annotate, props, story_types };
    });
  },
};