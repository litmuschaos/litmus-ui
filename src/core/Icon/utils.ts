import { IconName } from "./base";

// To get list of icons part of Icon
const getAvailableIcons = (): IconName[] => [
  "agents",
  "alert",
  "analytics",
  "applicationDashboard",
  "arrowDown",
  "arrowLeft",
  "arrowRight",
  "arrowUp",
  "backward",
  "calendar",
  "chaoshub",
  "check",
  "chevronDown",
  "chevronLeft",
  "chevronRight",
  "chevronUp",
  "clock",
  "close",
  "closeWrapped",
  "clusters",
  "code",
  "codeFilled",
  "collapseDown",
  "collapseLeft",
  "collapseRight",
  "collapseUp",
  "community",
  "computer",
  "configure",
  "copy",
  "dataSource",
  "disableSchedule",
  "disconnectTarget",
  "document",
  "download",
  "drive",
  "dropbox",
  "editSequence",
  "enableSchedule",
  "expand",
  "expandDown",
  "expandLeft",
  "expandRight",
  "expandUp",
  "experiment",
  "experimentError",
  "experimentFailed",
  "experimentFilled",
  "experimentNotAvailable",
  "experimentOmitted",
  "experimentPassed",
  "experimentPending",
  "experimentRunning",
  "experimentSkipped",
  "externalLink",
  "eye",
  "eyeSlash",
  "forward",
  "hamburger",
  "home",
  "info",
  "logout",
  "logs",
  "maximize",
  "menuHorizontal",
  "menuVertical",
  "minimize",
  "paused",
  "pencil",
  "project",
  "recurringSchedule",
  "refresh",
  "reload",
  "rocket",
  "schedule",
  "scheduleWorkflow",
  "search",
  "settings",
  "share",
  "showAnalytics",
  "sync",
  "terminate",
  "trash",
  "upload",
  "usage",
  "userDisable",
  "userEnable",
  "users",
  "workflow",
  "workflowCompleted",
  "workflowFailed",
  "workflowPending",
  "workflowRunning",
];

// List of icons having stroke color for the svg path
const iconsPathWithStroke = [
  "alert",
  "arrowDown",
  "arrowLeft",
  "arrowRight",
  "arrowUp",
  "backward",
  "chaoshub",
  "check",
  "chevronDown",
  "chevronLeft",
  "chevronRight",
  "chevronUp",
  "close",
  "code",
  "codeFilled",
  "computer",
  "configure",
  "dataSource",
  "drive",
  "dropbox",
  "editSequence",
  "enableSchedule",
  "expand",
  "externalLink",
  "eye",
  "eyeSlash",
  "forward",
  "hamburger",
  "home",
  "info",
  "logout",
  "logs",
  "maximize",
  "minimize",
  "project",
  "scheduleWorkflow",
  "search",
  "share",
  "sync",
  "terminate",
  "usage",
  "users",
  "workflowCompleted",
  "workflowFailed",
  "workflowPending",
];

// list of icons having rect element to have fill
const iconsWithRectFill = [
  "experimentError",
  "experimentFailed",
  "experimentFilled",
  "experimentNotAvailable",
  "experimentOmitted",
  "experimentPassed",
  "experimentPending",
  "experimentRunning",
  "experimentSkipped",
  "recurringSchedule",
];

// list of icons having rect element to have stroke
const iconsWithRectStroke = [
  "code",
  "codeFilled",
  "dataSource",
  "maximize",
  "minimize",
  "paused",
  "workflowCompleted",
  "workflowFailed",
  "workflowRunning",
];

export {
  getAvailableIcons,
  iconsPathWithStroke,
  iconsWithRectFill,
  iconsWithRectStroke,
};
