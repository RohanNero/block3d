import { Rule, Block3dConfig } from "../types/block3d";

/**
 * @param address is the currently connected user address
 * @return `passing` is a Rule[] containing all simple rule checks the user passed
 * @return `failing` is a Rule[] containing all simple rule checks the user failed
 */
export async function checkSimpleRules(
  address: string,
  block3dConfig: Block3dConfig,
) {
  let passing: Rule[] = [];
  let failing: Rule[] = [];

  let simpleRules: Rule[] = block3dConfig.rules.filter(
    (rule) => rule.type === "simple",
  );

  simpleRules.forEach((rule) => {
    rule.addresses?.includes(address) ? passing.push(rule) : failing.push(rule);
  });

  return { simplePassing: passing, simpleFailing: failing };
}
