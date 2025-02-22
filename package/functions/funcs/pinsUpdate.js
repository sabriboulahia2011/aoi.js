const channelPinsOptions = require("../../util/channelPinsOptions");

module.exports = async (d) => {
  const code = d.command.code;

  const inside = d.unpack();
  const err = d.inside(inside);

  if (err) return d.error(err);

  const option = Object.keys(channelPinsOptions).find(
    (opt) => opt === inside.inside
  );

  if (!option) return d.error(`❌ Invalid option in \`$pinsUpdate${inside}\``);

  const executor = channelPinsOptions[option].split(";")[1];

  return {
    code: code.replaceLast(
      `$pinsUpdate${inside}`,
      d.data.channel ? eval(`d.data.channel${executor}`) : ""
    ),
  };
};
