import * as ping from "./ping";

// Welcome commands
import * as welcomeSetup from "./welcome/welcome-setup";
import * as leaveSetup from "./welcome/leave-setup";

// Reaction role commands
import * as reactionRoleAdd from "./roles/reaction-role-add";
import * as reactionRoleRemove from "./roles/reaction-role-remove";
import * as reactionRoleList from "./roles/reaction-role-list";
import * as reactionRolePanel from "./roles/reaction-role-panel";

// Moderation commands
import * as purge from "./moderation/purge";
import * as kick from "./moderation/kick";
import * as ban from "./moderation/ban";

export const commands = {
    ping,
    "welcome-setup": welcomeSetup,
    "leave-setup": leaveSetup,
    "reaction-role-add": reactionRoleAdd,
    "reaction-role-remove": reactionRoleRemove,
    "reaction-role-list": reactionRoleList,
    "reaction-role-panel": reactionRolePanel,
    purge,
    kick,
    ban,
};