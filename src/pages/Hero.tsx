import React, { useEffect, useRef, useState } from "react";
import { Folder, Users, Zap, UsersRound, type LucideIcon } from "lucide-react";
import teamSyncHero from "../data/teamsyncHero";
import "./Hero.css";

const FEATURE_ICONS: Record<string, LucideIcon> = {
  folder: Folder,
  users: Users,
  zap: Zap,
  "users-round": UsersRound,
};

/**
 * Reveals a section once it scrolls into view. Falls back to "already visible"
 * if IntersectionObserver isn't available, so content is never hidden by default.
 */
function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export const Hero: React.FC = () => {
  const { title, subtitle, eyebrow, actions, featuresEyebrow, featuresTitle, features, stats } =
    teamSyncHero;

  const featuresReveal = useRevealOnScroll<HTMLDivElement>();
  const statsReveal = useRevealOnScroll<HTMLDivElement>();

  // Split the title so "Connected" can be highlighted with the primary colour,
  // as data-driven text rather than a hardcoded string.
  const titleWords = title.trim().split(" ");
  const highlightWord = titleWords[titleWords.length - 1];
  const leadingWords = titleWords.slice(0, -1).join(" ");

  return (
    <>
      <section className="hero">
        <div className="heroTop">
          <div className="heroText">
            <p className="eyebrow">
              <span className="eyebrowMark" />
              {eyebrow}
            </p>

            <h1 className="title">
              {leadingWords} <span className="titleHighlight">{highlightWord}.</span>
            </h1>

            <p className="subtitle">{subtitle}</p>

            <div className="actions">
              {actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className={action.variant === "primary" ? "actionPrimary" : "actionSecondary"}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>

          <div className="heroVisual" aria-hidden="true">
            <svg className="connectorSvg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path className="connectorLine" data-index="0" d="M62,50 L85,11" />
              <path className="connectorLine" data-index="1" d="M62,50 L89,45" />
              <path className="connectorLine" data-index="2" d="M62,50 L77,87" />
            </svg>

            <div className="coreCard">
              <div className="coreCardHeader">
                <span className="coreCardIcon">
                  <Folder size={16} />
                </span>
                <span className="coreCardLabel">Projects</span>
                <span className="coreCardLiveDot" />
              </div>
              <div className="coreCardRow">
                <span className="coreCardCheck coreCardCheckDone" />
                <span className="coreCardBar coreCardBarLg" />
                <span className="coreCardPill coreCardPillSuccess">Done</span>
              </div>
              <div className="coreCardRow">
                <span className="coreCardCheck" />
                <span className="coreCardBar coreCardBarXl" />
                <span className="coreCardPill coreCardPillWarning">In progress</span>
              </div>
              <div className="coreCardRow">
                <span className="coreCardCheck" />
                <span className="coreCardBar coreCardBarMd" />
              </div>
            </div>

            <div className="chip chipCrm">
              <span className="chipIcon">
                <Users size={14} />
              </span>
              <span className="chipLabel">CRM</span>
              <span className="chipPulse" />
            </div>

            <div className="chip chipAutomations">
              <span className="chipIcon">
                <Zap size={14} />
              </span>
              <span className="chipLabel">Automations</span>
              <span className="chipPulse" />
            </div>

            <div className="chip chipTeamwork">
              <span className="chipIcon">
                <UsersRound size={14} />
              </span>
              <span className="chipLabel">Teamwork</span>
              <span className="chipPulse" />
            </div>
          </div>
        </div>

        <div
          ref={featuresReveal.ref}
          className={`featuresSection ${featuresReveal.isVisible ? "revealed" : ""}`}
        >
          <div className="featuresHeader">
            <p className="eyebrow">
              <span className="eyebrowMark" />
              {featuresEyebrow}
            </p>
            <h2 className="featuresTitle">{featuresTitle}</h2>
          </div>

          <div className="featuresGrid">
            {features.map((feature, index) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <div key={feature.title} className="featureCard" data-index={index}>
                  <span className="featureIconBadge">{Icon && <Icon size={20} />}</span>
                  <h3 className="featureTitle">{feature.title}</h3>
                  <p className="featureDescription">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div
            ref={statsReveal.ref}
            className={`statsRow ${statsReveal.isVisible ? "revealed" : ""}`}
          >
            {stats.map((stat) => (
              <div key={stat.value} className="statItem">
                <span className="statValue">{stat.value}</span>
                <span className="statLabel">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;