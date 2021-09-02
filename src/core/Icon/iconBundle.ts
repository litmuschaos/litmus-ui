import agents from "../../assets/icons/agents.svg";
import analytics from "../../assets/icons/analytics.svg";
import applicationDashboard from "../../assets/icons/applicationDashboard.svg";
import arrowDown from "../../assets/icons/arrowDown.svg";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import arrowRight from "../../assets/icons/arrowRight.svg";
import arrowUp from "../../assets/icons/arrowUp.svg";
import backward from "../../assets/icons/backward.svg";
import calendar from "../../assets/icons/calendar.svg";
import check from "../../assets/icons/check.svg";
import chevronDown from "../../assets/icons/chevronDown.svg";
import chevronLeft from "../../assets/icons/chevronLeft.svg";
import chevronRight from "../../assets/icons/chevronRight.svg";
import chevronUp from "../../assets/icons/chevronUp.svg";
import clock from "../../assets/icons/clock.svg";
import close from "../../assets/icons/close.svg";
import clusters from "../../assets/icons/clusters.svg";
import code from "../../assets/icons/code.svg";
import collapseDown from "../../assets/icons/collapseDown.svg";
import collapseLeft from "../../assets/icons/collapseLeft.svg";
import collapseRight from "../../assets/icons/collapseRight.svg";
import collapseUp from "../../assets/icons/collapseUp.svg";
import community from "../../assets/icons/community.svg";
import configure from "../../assets/icons/configure.svg";
import copy from "../../assets/icons/copy.svg";
import dataSource from "../../assets/icons/dataSource.svg";
import disableSchedule from "../../assets/icons/disableSchedule.svg";
import disconnectTarget from "../../assets/icons/disconnectTarget.svg";
import document from "../../assets/icons/document.svg";
import download from "../../assets/icons/download.svg";
import enableSchedule from "../../assets/icons/enableSchedule.svg";
import expand from "../../assets/icons/expand.svg";
import expandDown from "../../assets/icons/expandDown.svg";
import expandLeft from "../../assets/icons/expandLeft.svg";
import expandRight from "../../assets/icons/expandRight.svg";
import expandUp from "../../assets/icons/expandUp.svg";
import experiment from "../../assets/icons/experiment.svg";
import experimentError from "../../assets/icons/experimentError.svg";
import experimentFailed from "../../assets/icons/experimentFailed.svg";
import experimentNotAvailable from "../../assets/icons/experimentNotAvailable.svg";
import experimentOmitted from "../../assets/icons/experimentOmitted.svg";
import experimentPassed from "../../assets/icons/experimentPassed.svg";
import experimentPending from "../../assets/icons/experimentPending.svg";
import experimentRunning from "../../assets/icons/experimentRunning.svg";
import experimentSkipped from "../../assets/icons/experimentSkipped.svg";
import externalLink from "../../assets/icons/externalLink.svg";
import eye from "../../assets/icons/eye.svg";
import eyeSlash from "../../assets/icons/eyeSlash.svg";
import forward from "../../assets/icons/forward.svg";
import hamburger from "../../assets/icons/hamburger.svg";
import home from "../../assets/icons/home.svg";
import info from "../../assets/icons/info.svg";
import logout from "../../assets/icons/logout.svg";
import logs from "../../assets/icons/logs.svg";
import maximize from "../../assets/icons/maximize.svg";
import menuHorizontal from "../../assets/icons/menuHorizontal.svg";
import menuVertical from "../../assets/icons/menuVertical.svg";
import minimize from "../../assets/icons/minimize.svg";
import paused from "../../assets/icons/paused.svg";
import pencil from "../../assets/icons/pencil.svg";
import project from "../../assets/icons/project.svg";
import recurringSchedule from "../../assets/icons/recurringSchedule.svg";
import refresh from "../../assets/icons/refresh.svg";
import reload from "../../assets/icons/reload.svg";
import schedule from "../../assets/icons/schedule.svg";
import scheduleWorkflow from "../../assets/icons/scheduleWorkflow.svg";
import search from "../../assets/icons/search.svg";
import settings from "../../assets/icons/settings.svg";
import share from "../../assets/icons/share.svg";
import showAnalytics from "../../assets/icons/showAnalytics.svg";
import sync from "../../assets/icons/sync.svg";
import terminate from "../../assets/icons/terminate.svg";
import trash from "../../assets/icons/trash.svg";
import upload from "../../assets/icons/upload.svg";
import usage from "../../assets/icons/usage.svg";
import userDisable from "../../assets/icons/userDisable.svg";
import userEnable from "../../assets/icons/userEnable.svg";
import users from "../../assets/icons/users.svg";
import workflow from "../../assets/icons/workflow.svg";
import workflowCompleted from "../../assets/icons/workflowCompleted.svg";
import workflowFailed from "../../assets/icons/workflowFailed.svg";
import workflowPending from "../../assets/icons/workflowPending.svg";
import workflowRunning from "../../assets/icons/workflowRunning.svg";
import { IconName } from "./base";

interface AllIconsProps {
  //  Generic key with value of type string
  [index: string]: string;
}

// All icons are imported and an object containing
// all the icons is constructed
const allIcons: AllIconsProps = {
  agents,
  analytics,
  applicationDashboard,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  backward,
  calendar,
  check,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  clock,
  close,
  clusters,
  code,
  collapseDown,
  collapseLeft,
  collapseRight,
  collapseUp,
  community,
  configure,
  copy,
  dataSource,
  disableSchedule,
  disconnectTarget,
  document,
  download,
  enableSchedule,
  expand,
  expandDown,
  expandLeft,
  expandRight,
  expandUp,
  experiment,
  experimentError,
  experimentFailed,
  experimentNotAvailable,
  experimentOmitted,
  experimentPassed,
  experimentPending,
  experimentRunning,
  experimentSkipped,
  externalLink,
  eye,
  eyeSlash,
  forward,
  hamburger,
  home,
  info,
  logout,
  logs,
  maximize,
  menuHorizontal,
  menuVertical,
  minimize,
  paused,
  pencil,
  project,
  recurringSchedule,
  refresh,
  reload,
  schedule,
  scheduleWorkflow,
  search,
  settings,
  share,
  showAnalytics,
  sync,
  terminate,
  trash,
  upload,
  usage,
  userDisable,
  userEnable,
  users,
  workflow,
  workflowCompleted,
  workflowFailed,
  workflowPending,
  workflowRunning,
};

// Function to get a particular icon from the object containing
// all the icons
const getIcon = (name: IconName): string => {
  return allIcons[name];
};

export { allIcons, getIcon };
