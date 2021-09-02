import i001 from "../../assets/icons/agents.svg";
import i002 from "../../assets/icons/analytics.svg";
import i003 from "../../assets/icons/applicationDashboard.svg";
import i004 from "../../assets/icons/arrowDown.svg";
import i005 from "../../assets/icons/arrowLeft.svg";
import i006 from "../../assets/icons/arrowRight.svg";
import i007 from "../../assets/icons/arrowUp.svg";
import i073 from "../../assets/icons/backward.svg";
import i008 from "../../assets/icons/calendar.svg";
import i009 from "../../assets/icons/check.svg";
import i010 from "../../assets/icons/chevronDown.svg";
import i011 from "../../assets/icons/chevronLeft.svg";
import i012 from "../../assets/icons/chevronRight.svg";
import i013 from "../../assets/icons/chevronUp.svg";
import i014 from "../../assets/icons/clock.svg";
import i015 from "../../assets/icons/close.svg";
import i016 from "../../assets/icons/clusters.svg";
import i017 from "../../assets/icons/code.svg";
import i019 from "../../assets/icons/collapseDown.svg";
import i020 from "../../assets/icons/collapseLeft.svg";
import i018 from "../../assets/icons/collapseRight.svg";
import i021 from "../../assets/icons/collapseUp.svg";
import i022 from "../../assets/icons/community.svg";
import i023 from "../../assets/icons/configure.svg";
import i024 from "../../assets/icons/copy.svg";
import i026 from "../../assets/icons/dataSource.svg";
import i025 from "../../assets/icons/delete.svg";
import i027 from "../../assets/icons/disableSchedule.svg";
import i028 from "../../assets/icons/disconnectTarget.svg";
import i029 from "../../assets/icons/document.svg";
import i030 from "../../assets/icons/download.svg";
import i032 from "../../assets/icons/enableSchedule.svg";
import i033 from "../../assets/icons/expand.svg";
import i034 from "../../assets/icons/expandDown.svg";
import i035 from "../../assets/icons/expandLeft.svg";
import i036 from "../../assets/icons/expandRight.svg";
import i037 from "../../assets/icons/expandUp.svg";
import i038 from "../../assets/icons/experiment.svg";
import i039 from "../../assets/icons/experimentError.svg";
import i040 from "../../assets/icons/experimentFailed.svg";
import i041 from "../../assets/icons/experimentNotAvailable.svg";
import i042 from "../../assets/icons/experimentOmitted.svg";
import i043 from "../../assets/icons/experimentPassed.svg";
import i044 from "../../assets/icons/experimentPending.svg";
import i045 from "../../assets/icons/experimentRunning.svg";
import i046 from "../../assets/icons/experimentSkipped.svg";
import i047 from "../../assets/icons/externalLink.svg";
import i048 from "../../assets/icons/eye.svg";
import i049 from "../../assets/icons/eyeSlash.svg";
import i062 from "../../assets/icons/forward.svg";
import i050 from "../../assets/icons/hamburger.svg";
import i051 from "../../assets/icons/home.svg";
import i052 from "../../assets/icons/info.svg";
import i053 from "../../assets/icons/logout.svg";
import i054 from "../../assets/icons/logs.svg";
import i055 from "../../assets/icons/maximize.svg";
import i056 from "../../assets/icons/menuHorizontal.svg";
import i057 from "../../assets/icons/menuVertical.svg";
import i058 from "../../assets/icons/minimize.svg";
import i059 from "../../assets/icons/paused.svg";
import i031 from "../../assets/icons/pencil.svg";
import i060 from "../../assets/icons/project.svg";
import i061 from "../../assets/icons/recurringSchedule.svg";
import i063 from "../../assets/icons/refresh.svg";
import i064 from "../../assets/icons/reload.svg";
import i065 from "../../assets/icons/schedule.svg";
import i066 from "../../assets/icons/scheduleWorkflow.svg";
import i067 from "../../assets/icons/search.svg";
import i068 from "../../assets/icons/settings.svg";
import i069 from "../../assets/icons/share.svg";
import i070 from "../../assets/icons/showAnalytics.svg";
import i071 from "../../assets/icons/sync.svg";
import i072 from "../../assets/icons/terminate.svg";
import i074 from "../../assets/icons/upload.svg";
import i075 from "../../assets/icons/usage.svg";
import i077 from "../../assets/icons/userDisable.svg";
import i078 from "../../assets/icons/userEnable.svg";
import i076 from "../../assets/icons/users.svg";
import i079 from "../../assets/icons/workflow.svg";
import i080 from "../../assets/icons/workflowCompleted.svg";
import i081 from "../../assets/icons/workflowFailed.svg";
import i082 from "../../assets/icons/workflowPending.svg";
import i083 from "../../assets/icons/workflowRunning.svg";
import { IconName } from "./base";

interface AllIconsProps {
  //  Generic key with value of type string
  [index: string]: string;
}

// All icons are imported and an object containing
// all the icons is constructed
const allIcons: AllIconsProps = {
  agents: i001,
  analytics: i002,
  applicationDashboard: i003,
  arrowDown: i004,
  arrowLeft: i005,
  arrowRight: i006,
  arrowUp: i007,
  calendar: i008,
  check: i009,
  chevronDown: i010,
  chevronLeft: i011,
  chevronRight: i012,
  chevronUp: i013,
  clock: i014,
  close: i015,
  clusters: i016,
  code: i017,
  collapseRight: i018,
  collapseDown: i019,
  collapseLeft: i020,
  collapseUp: i021,
  community: i022,
  configure: i023,
  copy: i024,
  delete: i025,
  dataSource: i026,
  disableSchedule: i027,
  disconnectTarget: i028,
  document: i029,
  download: i030,
  pencil: i031,
  enableSchedule: i032,
  expand: i033,
  expandDown: i034,
  expandLeft: i035,
  expandRight: i036,
  expandUp: i037,
  experiment: i038,
  experimentError: i039,
  experimentFailed: i040,
  experimentNotAvailable: i041,
  experimentOmitted: i042,
  experimentPassed: i043,
  experimentPending: i044,
  experimentRunning: i045,
  experimentSkipped: i046,
  externalLink: i047,
  eye: i048,
  eyeSlash: i049,
  hamburger: i050,
  home: i051,
  info: i052,
  logout: i053,
  logs: i054,
  maximize: i055,
  menuHorizontal: i056,
  menuVertical: i057,
  minimize: i058,
  paused: i059,
  project: i060,
  recurringSchedule: i061,
  forward: i062,
  refresh: i063,
  reload: i064,
  schedule: i065,
  scheduleWorkflow: i066,
  search: i067,
  settings: i068,
  share: i069,
  showAnalytics: i070,
  sync: i071,
  terminate: i072,
  backward: i073,
  upload: i074,
  usage: i075,
  users: i076,
  userDisable: i077,
  userEnable: i078,
  workflow: i079,
  workflowCompleted: i080,
  workflowFailed: i081,
  workflowPending: i082,
  workflowRunning: i083,
};

// Function to get a particular icon from the object containing
// all the icons
const getIcon = (name: IconName): string => {
  return allIcons[name];
};

export { allIcons, getIcon };
