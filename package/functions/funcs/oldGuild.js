const guildOptions = require("../../util/guildOptions");

module.exports = async (d) => {
  const code = d.command.code;

  const inside = d.unpack();
  const err = d.inside(inside);

  if (err) return d.error(err);

  const option = Object.keys(guildOptions).find(
    (opt) => opt === inside.inside
  );

  if (!option) return d.error(`❌ Invalid option in \`$oldGuild${inside}\``);

  const executor = guildOptions[option].split(";")[1];

  return {
    code: code.replaceLast(
      `$oldGuild${inside}`,
      d.data.old_guild ? eval(`d.data.old_guild${executor}`) : ""
    ),
  };
};
