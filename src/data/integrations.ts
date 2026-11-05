import type { Integration } from "@/types/integration";

const logoMap: Record<string, string> = {
  // Threat Intelligence
  "Qualys": "/logos/qualys.svg",
  "Radiflow": "/logos/radiflow.svg",
  "Recorded Future": "/logos/recorded-future.svg",
  "Reftab": "/logos/reftab.svg",
  "Remediant": "/logos/remediant.svg",
  "SafeBreach": "/logos/safebreach.svg",
  "SentinelOne": "/logos/sentinelone.svg",
  "Silverfort": "/logos/silverfort.svg",
  "Snowflake": "/logos/snowflake.svg",
  "Splunk": "/logos/splunk.svg",
  "Tanium": "/logos/tanium.svg",
  "ThreatQuotient": "/logos/threatquotient.svg",
  "Trellix": "/logos/trellix.svg",
  "Vectra": "/logos/vectra.svg",
  "VirusTotal": "/logos/virustotal.svg",

  // CSPM
  "Wiz": "/logos/wiz.svg",
  "Orca Security": "/logos/orca-security.svg",
  "Palo Alto Networks Prisma Cloud": "/logos/palo-alto-networks-prisma-cloud.svg",
  "Check Point CloudGuard": "/logos/checkpoint.svg",
  "Microsoft Defender for Cloud": "/logos/microsoft.svg",
  "AWS Security Hub": "/logos/aws.svg",
  "Google Security Command Center": "/logos/google-security-command-center.svg",
  "Tenable Cloud Security": "/logos/tenable.svg",
  "Rapid7 InsightCloudSec": "/logos/rapid7.svg",
  "Qualys TotalCloud": "/logos/qualys-totalcloud.svg",
  "CrowdStrike Falcon Cloud Security": "/logos/crowdstrike.svg",
  "Lacework FortiCNAPP": "/logos/lacework.svg",
  "Aqua Security": "/logos/aqua-security.svg",
  "Zscaler Posture Control": "/logos/zscaler.svg",

  // Email Security
  "Kubernetes": "/logos/kubernetes.svg",
  "1Password": "/logos/1password.svg",
  "Samurai XDR": "/logos/samurai-xdr.svg",
  "Trend Micro": "/logos/trend-micro.svg",
  "Zscaler": "/logos/zscaler.svg",
  "Zix": "/logos/zix.svg",
  "Votiro": "/logos/votiro.svg",
  "VMRay": "/logos/vmray.svg",
  "Veeam": "/logos/veeam.svg",
  "Tines": "/logos/tines.svg",
  "Tenable": "/logos/tenable.svg",
  "Sumo Logic": "/logos/sumo-logic.svg",
  "Symantec": "/logos/symantec.svg",
  "Slack": "/logos/slack.svg",

  // CNAPP
  "HackerOne": "/logos/hackerone.svg",
  "Honeywell": "/logos/honeywell.svg",
  "IBM": "/logos/ibm.svg",
  "Joe Sandbox": "/logos/joe-sandbox.svg",
  "JupiterOne": "/logos/jupiterone.svg",
  "Kivera": "/logos/kivera.svg",
  "LogRhythm": "/logos/logrhythm.svg",
  "Mandiant": "/logos/mandiant.svg",
  "Micro Focus": "/logos/microfocus.svg",
  "Mimecast": "/logos/mimecast.svg",
  "Netskope": "/logos/netskope.svg",
  "OCSF": "/logos/ocsf.svg",
  "Oracle": "/logos/oracle.svg",
  "PagerDuty": "/logos/pagerduty.svg",
  "PingOne": "/logos/pingone.svg",

  // IT Operations
  "AlienVault": "/logos/alienvault.svg",
  "Analyst1": "/logos/analyst1.svg",
  "Aruba": "/logos/aruba.svg",
  "AT&T": "/logos/atandt.svg",
  "AttackIQ": "/logos/attackiq.svg",
  "Automox": "/logos/automox.svg",
  "BlackBerry": "/logos/blackberry.svg",
  "Box": "/logos/box.svg",
  "Cisco": "/logos/cisco.svg",
  "Cribl": "/logos/cribl.svg",
  "CrowdStrike": "/logos/crowdstrike.svg",
  "CyberArk": "/logos/cyberark.svg",
  "CyCognito": "/logos/cycognito.svg",
  "Cylus": "/logos/cylus.svg",

  // SOAR
  "BeyondTrust": "/logos/beyondtrust.svg",
  "Auth0": "/logos/auth0.svg",
  "Atlassian": "/logos/atlassian.svg",
  "At-Bay": "/logos/at-bay.svg",
  "Armis": "/logos/armis.svg",
  "Anomali": "/logos/anomali.svg",
  "Amazon": "/logos/amazon.svg",
  "Alien Labs OTX": "/logos/alien-labs.svg",
  "AbuseIPDB": "/logos/abuseipdb.svg",
  "42Gears": "/logos/42gears.svg",
  "AIMS": "/logos/aims.svg",

  // SIEM
  "BlueCat Networks": "/logos/bluecat.svg",
  "Check Point": "/logos/checkpoint.svg",
  "Cloudflare": "/logos/cloudflare.svg",
  "Criminal IP": "/logos/criminal-ip.svg",
  "Cybereason": "/logos/cybereason.svg",
  "Darktrace": "/logos/darktrace.svg",
  "Docker": "/logos/docker.svg",
  "Exabeam": "/logos/exabeam.svg",
  "F5 Distributed Cloud Services": "/logos/f5.svg",
  "Forescout": "/logos/forescout.svg",
  "Graylog": "/logos/graylog.svg",
  "HashiCorp": "/logos/hashicorp.svg",
  "HP": "/logos/hp.svg",
  "Infoblox": "/logos/infoblox.svg",
  "JumpCloud": "/logos/jumpcloud.svg",

  // Cloud Security
  "Keeper Security": "/logos/keeper-security.svg",
  "Lacework": "/logos/lacework.svg",
  "Malwarebytes": "/logos/malwarebytes.svg",
  "Mattermost": "/logos/mattermost.svg",
  "Microsoft": "/logos/microsoft.svg",
  "MISP TIP": "/logos/misp.svg",
  "OAuth": "/logos/oauth.svg",
  "Okta": "/logos/okta.svg",
  "Palo Alto Networks": "/logos/palo-alto-networks.svg",
  "Prometheus": "/logos/prometheus.svg"
};

export const integrations: Integration[] = [
  // Threat Intelligence
  ...[
    "Qualys", "Radiflow", "Recorded Future", "Reftab", "Remediant",
    "SafeBreach", "SentinelOne", "Silverfort", "Snowflake", "Splunk",
    "Tanium", "ThreatQuotient", "Trellix", "Vectra", "VirusTotal"
  ].map((name) => ({ name, category: "Threat Intelligence", logo: logoMap[name] })),

  // CSPM
  ...[
    "Wiz", "Orca Security", "Palo Alto Networks Prisma Cloud",
    "Check Point CloudGuard", "Microsoft Defender for Cloud",
    "AWS Security Hub", "Google Security Command Center",
    "Tenable Cloud Security", "Rapid7 InsightCloudSec", "Qualys TotalCloud",
    "CrowdStrike Falcon Cloud Security", "Lacework FortiCNAPP",
    "Aqua Security", "Zscaler Posture Control"
  ].map((name) => ({ name, category: "CSPM", logo: logoMap[name] })),

  // Email Security
  ...[
    "Kubernetes", "1Password", "Samurai XDR", "Trend Micro", "Zscaler",
    "Zix", "Wiz", "Votiro", "VMRay", "Veeam", "Tines", "Tenable",
    "Sumo Logic", "Symantec", "Slack"
  ].map((name) => ({ name, category: "Email Security", logo: logoMap[name] })),

  // CNAPP
  ...[
    "HackerOne", "Honeywell", "IBM", "Joe Sandbox", "JupiterOne",
    "Kivera", "LogRhythm", "Mandiant", "Micro Focus", "Mimecast",
    "Netskope", "OCSF", "Oracle", "PagerDuty", "PingOne"
  ].map((name) => ({ name, category: "CNAPP", logo: logoMap[name] })),

  // IT Operations
  ...[
    "AlienVault", "Analyst1", "Aqua Security", "Aruba", "AT&T",
    "AttackIQ", "Automox", "BlackBerry", "Box", "Cisco", "Cribl",
    "CrowdStrike", "CyberArk", "CyCognito", "Cylus"
  ].map((name) => ({ name, category: "IT Operations", logo: logoMap[name] })),

  // SOAR
  ...[
    "BeyondTrust", "Auth0", "Atlassian", "At-Bay", "Armis", "Anomali",
    "Amazon", "Alien Labs OTX", "AbuseIPDB", "42Gears", "AIMS"
  ].map((name) => ({ name, category: "SOAR", logo: logoMap[name] })),

  // SIEM
  ...[
    "BlueCat Networks", "Check Point", "Cloudflare", "Criminal IP",
    "Cybereason", "Darktrace", "Docker", "Exabeam",
    "F5 Distributed Cloud Services", "Forescout", "Graylog",
    "HashiCorp", "HP", "Infoblox", "JumpCloud"
  ].map((name) => ({ name, category: "SIEM", logo: logoMap[name] })),

  // Cloud Security
  ...[
    "Keeper Security", "Lacework", "Malwarebytes", "Mattermost",
    "Microsoft", "MISP TIP", "OAuth", "Okta", "Orca Security",
    "Palo Alto Networks", "Prometheus"
  ].map((name) => ({ name, category: "Cloud Security", logo: logoMap[name] }))
];

export const categoryNames = [
  "All Integrations",
  "Threat Intelligence",
  "CSPM",
  "Email Security",
  "CNAPP",
  "IT Operations",
  "SOAR",
  "SIEM",
  "Cloud Security"
];
