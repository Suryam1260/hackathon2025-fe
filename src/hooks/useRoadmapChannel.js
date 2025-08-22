import { useEffect, useRef } from "react";
import { getActionCableConsumer } from "@/lib/cable";

import { setSelectedRoadmap, setRoadmapGeneration } from "@/store/slices/roadmapSlice";
import { useDispatch } from "react-redux";

/**
 * Subscribes to Rails ActionCable RoadmapChannel stream_for("roadmap_${roadmapId}")
 * Logs all incoming payloads and connection lifecycle events.
 */
const useRoadmapChannel = (roadmapId) => {
  const subscriptionRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!roadmapId) return;

    const consumer = getActionCableConsumer();

    // Identifier should match your Rails channel
    // class RoadmapChannel < ApplicationCable::Channel
    //   def subscribed
    //     stream_for "roadmap_#{params[:roadmap_id]}"
    //   end
    // end
    const identifier = { channel: "RoadmapChannel", roadmap_id: String(roadmapId) };

    const subscription = consumer.subscriptions.create(identifier, {
      connected() {
        console.log(`[Cable] Connected to roadmap_${roadmapId}`);
      },
      disconnected() {
        console.log(`[Cable] Disconnected from roadmap_${roadmapId}`);
      },
      rejected() {
        console.warn(`[Cable] Subscription rejected for roadmap_${roadmapId}`);
      },
      received(data) {
        // Expecting messages with keys like: { state: "...", data: {...} }
        console.log(`[Cable] Message for roadmap_${roadmapId}:`, data);
        console.log('data?.data inside useRoadmapChannel', data?.data);
        dispatch(setSelectedRoadmap(data?.data));
        if (data?.data?.status === "generating") {
          dispatch(setRoadmapGeneration({
            message: "Roadmap generation started",
            roadmap_id: data?.data.id,
            status: "generating",
          }));
        } else {
          dispatch(setRoadmapGeneration(null));
        }
      },
    });

    subscriptionRef.current = subscription;

    return () => {
      if (subscriptionRef.current) {
        try {
          consumer.subscriptions.remove(subscriptionRef.current);
          console.log(`[Cable] Unsubscribed from roadmap_${roadmapId}`);
        } catch {
          // no-op
        }
        subscriptionRef.current = null;
      }
    };
  }, [roadmapId]);
};

export default useRoadmapChannel; 